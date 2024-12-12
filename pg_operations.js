import { Sequelize, DataTypes } from "sequelize";

export let sequelize;

export function ClosePGConnection() {
    if (sequelize) {
        sequelize.close();
    }
}

export let Book, Author;

export function InitPGConnection(pgURL, dbSyncForce) {
    sequelize = new Sequelize(pgURL);

    try {
        sequelize.authenticate();
        console.log("postgres connection has been established successfully.");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }

    Book = sequelize.define(
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

    Author = sequelize.define(
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

    // console.log(Book === sequelize.models.Book);
    // console.log(Author === sequelize.models.Author);

    Book.belongsToMany(Author, { through: "AuthorBooks" });
    Author.belongsToMany(Book, { through: "AuthorBooks" });

    if (dbSyncForce === "1") {
        console.log("force sync database", dbSyncForce);
        sequelize.sync({ force: true });
    } else {
        sequelize.sync({ force: false });
    }
}
