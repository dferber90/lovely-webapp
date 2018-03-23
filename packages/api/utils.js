const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { APP_SECRET } = require('./app-secret');

function getUserId(context) {
  const Authorization =
    context.request.get('Authorization') || context.request.cookies.authToken;
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, APP_SECRET);
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
  endpoint: 'https://eu1.prisma.sh/dominik-ferber-4ba4fb/blogr/dev',
  // specified in database/prisma.yml
  secret: 'mysecret123',
  // log all GraphQL queries & mutations
  debug: true,
};

module.exports = {
  getUserId,
  createToken,
  comparePasswords,
  hashPassword,
  prismaOptions,
};
