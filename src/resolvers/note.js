import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, hasNote } from "./authorization";

export default {
  Query: {
    notes: async (parent, args, { me, models }, info) => {
      return models.Note.find({ user: me.id }).sort({ date: -1 });
    },
    note: async (parent, args, { models }, info) => {
      const note = models.Note.findById(args.id);
      return note;
    }
  },
  Mutation: {
    createNote: combineResolvers(
      isAuthenticated,
      async (parent, args, { me, models }, info) => {
        const { title, body } = args;

        const newNote = await models.Note.create({
          title,
          body,
          user: me.id,
        });
        return newNote;
      }
    ),

    deleteNote: combineResolvers(
      isAuthenticated,
      async (parent, args, { me, models }, info) => {
        const note = await models.Note
          .findById(args.id)

        if (!note) {
          throw new Error("Note not found");
        }
        console.log(note);
        if (note.user.toString() !== me.id) {
          throw new Error("User not authorized");
        }

        note
          .remove()
          .then(note)
          .catch(err => {
            console.log(err)
            throw new Error("Note not found");
          });
        return true;
      }
    )
  }
};
