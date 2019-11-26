import { combineResolvers } from "graphql-resolvers";
import { isAuthenticated, hasNote } from "./authorization";

export default {
  Query: {
    notes: async (parent, args, { me, models }, info) => {
      const notes = await models.Note.find({ user: me.id }).sort({ updated_at: -1 })

      return notes.filter(note => note.title.includes(args.filter) || note.body.includes(args.filter))

      // }

      // return models.Note.find({ user: me.id }).sort({ updated_at: -1 });
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

        // const newNote = new models.Note({
        //   title,
        //   body,
        //   user: me.id,
        // })
        // newNote.save((err) => {
        //   if (err) throw new Error("Couldnt add post")
        // })
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
        // const editedNote = await models.Note.updateOne({ _id: args.id }, { $set: { args } }, { new: true })
        const editedNote = await models.Note.findByIdAndUpdate(args.id, args, { new: true, 'upsert': true })

        return editedNote;
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
        return note.id;
      }
    )
  }
};
