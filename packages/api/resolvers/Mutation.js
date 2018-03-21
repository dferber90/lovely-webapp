const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../app-secret');
const { getUserId } = require('../utils');

const createToken = (userId, appSecret) => jwt.sign({ userId }, appSecret);

async function signup(parent, args, context) {
  const password = await bcrypt.hash(args.password, 10);
  const user = await context.db.mutation.createUser({
    data: { ...args, password },
  });

  const token = createToken(user.id, APP_SECRET);

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

  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid password');
  }

  const token = createToken(user.id, APP_SECRET);

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

module.exports = {
  signup,
  login,
  post,
  vote,
};
