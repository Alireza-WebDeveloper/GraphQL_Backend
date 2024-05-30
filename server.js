import { ApolloServer } from '@apollo/server';
import { expressMiddleware as apolloMiddleware } from '@apollo/server/express4';
import { resolvers } from './graphql/resolves.js';
import { readFile } from 'node:fs/promises';

import app from './app.js';

const Port = process.env.PORT || 8000;

const typeDefs = await readFile('./graphql/typeDefs.graphql', 'utf-8');
const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
app.use('/graphql', apolloMiddleware(apolloServer));

app.listen('8000', () => {
  console.log(`server is running on port ${Port}`);
  console.log(`graphql endpoint http://localhost:8000/graphql`);
});
