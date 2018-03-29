const {
  getUserId,
  createToken,
  comparePasswords,
  hashPassword,
} = require('../utils');

async function signup(parent, args, context) {
  const password = await hashPassword(args.password);
  const user = await context.db.mutation.createUser({
    data: { ...args, password },
  });

  const token = createToken(user.id, process.env.APP_SECRET);

  return {
    token,
    user,
  };
}

async function login(parent, args, context) {
  const user = await context.db.query.user({ where: { email: args.email } });
  if (!user) {
    throw new Error(`Could not find user with email: ${args.email}`);
  }

  const valid = await comparePasswords(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = createToken(user.id, process.env.APP_SECRET);

  return {
    token,
    user,
  };
}

function post(parent, args, context, info) {
  const { url, description } = args;
  const userId = getUserId(context);
  return context.db.mutation.createLink(
    { data: { url, description, postedBy: { connect: { id: userId } } } },
    info
  );
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context);
  const { linkId } = args;
  const linkExists = await context.db.exists.Vote({
    user: { id: userId },
    link: { id: linkId },
  });
  if (linkExists) {
    throw new Error(`Already voted for link: ${linkId}`);
  }

  return context.db.mutation.createVote(
    {
      data: {
        user: { connect: { id: userId } },
        link: { connect: { id: linkId } },
      },
    },
    info
  );
}

async function subscribe(parent, args, context, info) {
  const { email } = args;
  return context.db.mutation.createNewsletterSubscriber({
    data: { email },
    info,
  });
}

module.exports = {
  signup,
  login,
  post,
  vote,
  subscribe,
};
