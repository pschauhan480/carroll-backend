const dotenv = require("dotenv");
dotenv.config();

const dbUser = process.env.DATABASE_USER;
const dbName = process.env.DATABASE_NAME;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_HOST;
const dbPort = process.env.DATABASE_PORT;

const dbSyncForce = process.env.DATABASE_SYNC_FORCE;

const { Sequelize, DataTypes } = require("sequelize");

pgURL = `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`;
// console.log(pgURL);

const sequelize = new Sequelize(
  `postgres://${dbUser}:${dbPassword}@${dbHost}:${dbPort}/${dbName}`
);

try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
  return;
}

const Book = sequelize.define(
  "Book",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    published_date: {
      type: DataTypes.TIME,
    },
  },
  {}
);

const Author = sequelize.define(
  "Author",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    biography: {
      type: DataTypes.STRING,
    },
    born_date: {
      type: DataTypes.DATE,
    },
  },
  {}
);

console.log(Book === sequelize.models.Book);
console.log(Author === sequelize.models.Author);
if (dbSyncForce) {
  sequelize.sync({ force: true });
} else {
  sequelize.sync({ force: false });
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

// sequelize.close();
