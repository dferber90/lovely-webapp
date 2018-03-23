const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const { login } = require('./routes/login');
const { logout } = require('./routes/logout');
const { prismaOptions } = require('./utils');
const cookieParser = require('cookie-parser');

const resolvers = { Query, Mutation };

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma(prismaOptions),
  }),
});

server.use(cookieParser());

server.post('/login', login);
server.post('/logout', logout);

server.start(
  {
    cors: {
      origin: true,
      credentials: true,
    },
  },
  () =>
    // eslint-disable-next-line no-console
    console.log(`The server is running on http://localhost:4000`)
);
