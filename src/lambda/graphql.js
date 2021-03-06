import { ApolloServer, AuthenticationError, gql } from "apollo-server-lambda";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import models from "../models";
import resolvers from "../resolvers";
import schemas from "../schema";

import config from "../config/keys";

//validate jwt then set me in graphql server context
const getMe = async (token) => {
  if (token) {
    try {
      const user = await jwt.verify(token, config.SECRET, {
        algorithm: ["HS256"]
      })
      return user;
    } catch (e) {
      throw new AuthenticationError("Your Session expired. Sign in again.");
    }
  }
};

const server = new ApolloServer({
  typeDefs: schemas,
  resolvers,
  //set context with things you would want to use across some/most/all resolvers
  context: async ({ event, context }) => {
    const user = await getMe(event.headers.authorization);
    return {
      models,
      me: user,
      secret: config.SECRET
    };
  }
});

//connect mongo dbs
const db = config.MONGO_URI;
console.log(db);
mongoose
  .connect(db, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

exports.handler = server.createHandler({
  cors: {
    origin: '*',
    credentials: true,
  },
});
