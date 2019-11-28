const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
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
});

//middleware hook
UserSchema.pre('findOneAndUpdate', function () {
	this.update({}, { $set: { updated_at: new Date() } });
});

module.exports = mongoose.model("users", UserSchema);
