import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, hasNote } from "./authorization";

export default {
  Query: {
    notes: async (parent, args, { me, models }, info) => {
      //fetch notes and sort by last updated
      let notes = await models.Note.find({ user: me.id }).sort({ updated_at: -1 })

      //if a filter exists, then apply it. case insensitive
      if (args.filter)
        notes = notes.filter(note => note.title.toLowerCase().includes(args.filter.toLowerCase()) || note.body.toLowerCase().includes(args.filter.toLowerCase()))

      return notes;
    },
    note: async (parent, args, { models }, info) => {
      return models.Note.findById(args.id);
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

    editNote: combineResolvers(
      isAuthenticated,
      async (parent, args, { me, models }, info) => {
        return await models.Note.findByIdAndUpdate(args.id, args, { new: true, 'upsert': true });
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
        return note.id;
      }
    )
  }
};
