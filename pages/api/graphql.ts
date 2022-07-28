import { ApolloServer } from 'apollo-server-micro';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { DogsResolver } from '../../src/schema/dogs.resolver';

const schema = await buildSchema({
  resolvers: [DogsResolver],
});

const server = new ApolloServer({
  schema,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const startSever = server.start();

export default async function handler(req, res) {
  await startSever;
  await server.createHandler({ path: '/api/graphql' })(req, res);
}
