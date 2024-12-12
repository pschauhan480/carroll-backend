import { GraphQLScalarType, Kind } from "graphql";

export const typeDefs = `#graphql
  scalar Date

  type Book {
    title: String
    description: String
    published_date: Date
  }

  type Author {
    name: String
    biography: String
    born_date: Date
  }

  type Query {
    books: [Book]
    authors: [Author]
  }
`;

export const resolvers = {
  Query: {
    books: () => {
      return [];
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
