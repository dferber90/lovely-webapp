require('./clean-env');
const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const Query = require('./resolvers/Query');
const Mutation = require('./resolvers/Mutation');
const { prismaOptions } = require('./utils');

const resolvers = { Query, Mutation };

const server = new GraphQLServer({
  typeDefs: './schema.graphql',
  resolvers,
  resolverValidationOptions: {
    // Mute the following warning:
    //   Type "Node" is missing a "resolveType" resolver. Pass false into
    //   "resolverValidationOptions.requireResolversForResolveType"
    //   to disable this warning.
    // Not sure about the effects this has. The Apollo Docs state
    //   requireResolversForResolveType will require a resolveType() method for
    //   Interface and Union types. This can be passed in with the field
    //   resolvers as __resolveType(). False to disable the warning.
    // https://www.apollographql.com/docs/graphql-tools/generate-schema.html
    // (search for  "requireResolversForResolveType" there)
    requireResolversForResolveType: false,
  },
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
