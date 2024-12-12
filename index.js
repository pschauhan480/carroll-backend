const dotenv = require("dotenv");
dotenv.config();

const pgDbUser = process.env.PG_DATABASE_USER;
const pgDbName = process.env.PG_DATABASE_NAME;
const pgDbPassword = process.env.PG_DATABASE_PASSWORD;
const pgDbHost = process.env.PG_DATABASE_HOST;
const pgDbPort = process.env.PG_DATABASE_PORT;

const dbSyncForce = process.env.DATABASE_SYNC_FORCE;

const { Sequelize, DataTypes } = require("sequelize");

pgURL = `postgres://${pgDbUser}:${pgDbPassword}@${pgDbHost}:${pgDbPort}/${pgDbName}`;
// console.log(pgURL);

const sequelize = new Sequelize(pgURL);

try {
  sequelize.authenticate();
  console.log("postgres connection has been established successfully.");
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

const mongoose = require("mongoose");

const { Schema } = mongoose;

// const mongoDbUser = process.env.MONGO_DATABASE_USER;
const mongoDbName = process.env.MONGO_DATABASE_NAME;
// const mongoDbPassword = process.env.MONGO_DATABASE_PASSWORD;
const mongoDbHost = process.env.MONGO_DATABASE_HOST;
const mongoDbPort = process.env.MONGO_DATABASE_PORT;

const bookMetadataSchema = new Schema({
  bookID: String,
  data: Schema.Types.Mixed,
});
const bookMetadataModel = mongoose.model("book_metadata", bookMetadataSchema);
const auditLogSchema = new Schema({
  log: Schema.Types.Mixed,
  createdBy: String,
  createdAt: Schema.Types.Date,
  updatedBy: String,
  updatedAt: Schema.Types.Date,
});
const auditLogModel = mongoose.model("audit_log", auditLogSchema);

try {
  mongoose.connect(`mongodb://${mongoDbHost}:${mongoDbPort}/${mongoDbName}`);
  console.log("mongo connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the mongo database:", error);
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

// sequelize.close();
