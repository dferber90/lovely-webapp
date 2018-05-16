const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

function getUserId(context) {
  const Authorization =
    context.request.get('Authorization') || context.request.cookies.authToken;
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.API_TOKEN_SECRET);
    return userId;
  }

  throw new Error('Not authenticated');
}

const createToken = (userId, appSecret) => jwt.sign({ userId }, appSecret);

const comparePasswords = (a, b) => bcrypt.compare(a, b);
const hashPassword = password => bcrypt.hash(password, 10);

const prismaOptions = {
  // the generated Prisma DB schema
  typeDefs: './generated/prisma.graphql',
  // the endpoint of the Prisma DB service
  endpoint: process.env.PRISMA_ENDPOINT,
  // specified in database/prisma.yml
  secret: process.env.PRISMA_SECRET,
  // log all GraphQL queries & mutations
  debug: DEV,
};

module.exports = {
  getUserId,
  createToken,
  comparePasswords,
  hashPassword,
  prismaOptions,
};
