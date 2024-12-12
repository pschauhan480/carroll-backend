const dotenv = require("dotenv");
dotenv.config();

const dbUser = process.env.DATABASE_USER;
const dbName = process.env.DATABASE_NAME;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_HOST;
const dbPort = process.env.DATABASE_PORT;

const { Sequelize } = require("sequelize");

pgURL = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
// console.log(pgURL);

const pgConnection = new Sequelize(
  `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
);

try {
  pgConnection.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
  return;
}

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
