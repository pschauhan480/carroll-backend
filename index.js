import * as dotenv from "dotenv";
import { typeDefs, resolvers } from "./schema.js";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";

import { InitPGConnection } from "./pg_operations.js";
import { InitMongoConnection } from "./mongo_operations.js";

dotenv.config();

const pgDbUser = process.env.PG_DATABASE_USER;
const pgDbName = process.env.PG_DATABASE_NAME;
const pgDbPassword = process.env.PG_DATABASE_PASSWORD;
const pgDbHost = process.env.PG_DATABASE_HOST;
const pgDbPort = process.env.PG_DATABASE_PORT;

export const dbSyncForce = process.env.DATABASE_SYNC_FORCE;

export const pgURL = `postgres://${pgDbUser}:${pgDbPassword}@${pgDbHost}:${pgDbPort}/${pgDbName}`;
// console.log(pgURL);

InitPGConnection(pgURL, dbSyncForce);

// const mongoDbUser = process.env.MONGO_DATABASE_USER;
const mongoDbName = process.env.MONGO_DATABASE_NAME;
// const mongoDbPassword = process.env.MONGO_DATABASE_PASSWORD;
const mongoDbHost = process.env.MONGO_DATABASE_HOST;
const mongoDbPort = process.env.MONGO_DATABASE_PORT;

const mongoURL = `mongodb://${mongoDbHost}:${mongoDbPort}/${mongoDbName}`;

InitMongoConnection(mongoURL);

const app = express();
const port = process.env.SERVER_PORT;

const httpServer = http.createServer(app);

const graphqlServer = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await graphqlServer.start();

app.use(
    "/graphql",
    cors(),
    express.json(),
    // expressMiddleware accepts the same arguments:
    // an Apollo Server instance and optional configuration options
    expressMiddleware(graphqlServer, {
        context: async ({ req }) => ({ token: req.headers.token }),
    })
);

app.get("/", (req, res) => {
    res.send("Hello, world!");
});

app.listen(port, () => {
    console.log(`server started at port ${port}`);
});

// sequelize.close();
