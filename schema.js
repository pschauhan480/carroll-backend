import { GraphQLError } from "graphql";
import { GraphQLScalarType, Kind } from "graphql";

import { Book, Author } from "./pg_operations.js";

export const typeDefs = `#graphql
    scalar Date

    type Book {
        id: ID
        title: String
        description: String
        published_date: Date
    }

    type Author {
        id: ID
        name: String
        biography: String
        born_date: Date
    }

    type BookReview {
        id: ID
        bookid: ID
        rating: String
        review: String
    }

    type Query {
        books(id: ID, title: String, authorid: ID, page: Int, limit: Int): [Book]
        authors(id: ID, name: String, page: Int, limit: Int): [Author]
        bookreviews(bookid: ID!): [BookReview]
    }

    input BookInput {
        title: String
        description: String
        published_date: Date
    }

    input AuthorInput {
        name: String
        biography: String
        born_date: Date
    }

    type Mutation {
        createBook(book: BookInput!): Book
        updateBook(book: BookInput): Book
        deleteBook(bookid: ID!): Book

        createAuthor(author: AuthorInput!): Author
        updateAuthor(author: AuthorInput): Author
        deleteAuthor(authorid: ID!): Author
    }
`;

export const resolvers = {
    Query: {
        books: async (_, req) => {
            if (Book) {
                return Book.findAll();
            } else {
                throw new GraphQLError("Book model is not initialized", {
                    extensions: {
                        code: "INTERNAL_SERVER_ERROR",
                        http: {
                            status: 500,
                        },
                    },
                });
            }
        },
    },
    Mutation: {
        createBook: async (_, req) => {
            if (Book) {
                console.log("create book request", req.book);
                const newBook = Book.build(req.book);
                // console.log(newBook instanceof Book);
                // console.log(newBook.name);
                await newBook.save();
                return newBook;
            } else {
                throw new GraphQLError("Book model is not initialized", {
                    extensions: {
                        code: "INTERNAL_SERVER_ERROR",
                        http: {
                            status: 500,
                        },
                    },
                });
            }
        },
    },
    Date: new GraphQLScalarType({
        name: "Date",
        description: "Date custom scalar type",
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return value.getTime();
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10);
            }
            return null;
        },
    }),
};
