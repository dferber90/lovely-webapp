const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const { prismaOptions } = require('./utils');

const resolvers = { Query, Mutation };

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma(prismaOptions),
  }),
});

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
