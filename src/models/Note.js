const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const NoteSchema = new Schema({
	user: {
		type: Schema.Types.ObjectId,
		ref: "users"
	},
	title: {
		type: String,
		required: true
	},
	body: {
		type: String,
		required: true
	},
	created_at: {
		type: Date,
		default: Date.now
	},
	updated_at: {
		type: Date,
		default: Date.now
	}
})

//middleware hook
NoteSchema.pre('findOneAndUpdate', function () {
	console.log('middleware triggered')
	this.update({}, { $set: { updated_at: new Date() } });
});

module.exports = mongoose.model("note", NoteSchema);