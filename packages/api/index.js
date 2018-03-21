const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');

const resolvers = { Query, Mutation };

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      // the generated Prisma DB schema
      typeDefs: './generated/prisma.graphql',
      // the endpoint of the Prisma DB service
      endpoint: 'https://eu1.prisma.sh/dominik-ferber-4ba4fb/blogr/dev',
      // specified in database/prisma.yml
      secret: 'mysecret123',
      // log all GraphQL queries & mutations
      debug: true,
    }),
  }),
});

server.start(() =>
  // eslint-disable-next-line no-console
  console.log(`The server is running on http://localhost:4000`)
);
