import { GraphQLDateTime } from "graphql-iso-date";

import noteResolvers from "./note";
import userResolvers from "./user";

const customScalarResolver = {
	Date: GraphQLDateTime,
};

export default [
	customScalarResolver,
	userResolvers,
	noteResolvers
];
