import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-micro';
import {
  buildSchema,
  Field,
  ID,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';

@ObjectType()
export class Dog {
  @Field(() => ID)
  name: string;
}

@Resolver(Dog)
export class DogResolver {
  @Query(() => [Dog])
  dogs(): Dog[] {
    return [{ name: 'Bo' }, { name: 'Buddy' }];
  }
}

const schema = await buildSchema({
  resolvers: [DogResolver],
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
