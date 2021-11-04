import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import HelloWorld from "./src/resolver";
import dotenv from "dotenv";
import { createConnection } from "typeorm";
import User from "./src/entity";

dotenv.config({ path: "./config.env" });

const main = async () => {
  const schema = await buildSchema({ resolvers: [HelloWorld] });
  const server = new ApolloServer({
    schema,
  });

  // The `listen` method launches a web server.
  server
    .listen(7500)
    .then(({ url }) => {
      console.log(`🚀  Server ready at ${url}`);
    })
    .catch((e) => {
      console.log(`error in running the server ${e}`);
    });
};

createConnection({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [User],
})
  .then(() => {
    console.log("Database Connected");
    main();
  })
  .catch((e) => {
    console.log(`error in connecting the db ${e}`);
  });
