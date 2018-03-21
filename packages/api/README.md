# GraphCool Server

## Required Reading

* https://blog.graph.cool/tutorial-how-to-build-a-graphql-server-with-graphql-yoga-6da86f346e68
* https://www.howtographql.com/graphql-js/0-introduction/
* https://blog.graph.cool/deploying-graphql-servers-with-zeit-now-85f4757b79a7

## steps for adding a new feature to your GraphQL API

1.  Adjust data model (if necessary)
1.  Deploy Prisma database service to apply changes to data model (if necessary)
1.  Add new root field (on the Query, Mutation or Subscription field) to application schema
1.  Implement the resolver for the new root field
