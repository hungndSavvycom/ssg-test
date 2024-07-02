import { ApolloServer } from 'apollo-server';
import { typeDefs, resolvers } from './graphql/schema';

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  introspection: true, // Enable introspection for Apollo Studio
  cors: {
    origin: '*', // Allow all origins
    credentials: true,
  },
});

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`Listen server at ${url}`);
});