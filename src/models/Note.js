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
	date: {
		type: Date,
		default: Date.now
	}
})


module.exports = mongoose.model("note", NoteSchema);