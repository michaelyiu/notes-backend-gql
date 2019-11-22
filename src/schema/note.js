import { gql } from "apollo-server-lambda";

export default gql`
  extend type Query {
    note(id: ID!): Note
    notes: [Note]
  }

  extend type Mutation {
    createNote(
      title: String!
      body: String!
    ): Note

    deleteNote(id: ID!): Boolean
  }

  type Note {
    id: ID!
    title: String!
    body: String!
    user: String
    date: Date
  }
`;
