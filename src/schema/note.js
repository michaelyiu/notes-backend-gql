import { gql } from "apollo-server-lambda";

export default gql`
  extend type Query {
    note(id: ID!): Note
    notes(filter: String): [Note]
  }

  extend type Mutation {
    createNote(
      title: String!
      body: String!
    ): Note

    editNote(
      id: ID!
      title: String!
      body: String!
    ): Note

    deleteNote(id: ID!): ID
  }

  type Note {
    id: ID!
    title: String!
    body: String!
    user: String
    created_at: Date
    updated_at: Date
  }
`;
