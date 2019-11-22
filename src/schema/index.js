import { gql } from "apollo-server-lambda";
import userSchema from "./user";
import noteSchema from "./note";

const linkSchema = gql`
  scalar Date
  
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
`;
//schema stitch
export default [
	linkSchema,
	userSchema,
	noteSchema
];