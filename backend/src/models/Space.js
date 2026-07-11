const mongoose = require("mongoose");

const spaceSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			minlength: 1,
			maxlength: 100,
		},
		type: {
			type: String,
			required: true,
			trim: true,
			minlength: 1,
			maxlength: 60,
		},
		capacity: {
			type: Number,
			required: true,
			min: 1,
			max: 5000,
		},
		imageUrl: {
			type: String,
			trim: true,
			default: null,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
			transform: (doc, ret) => {
				ret.id = ret._id ? ret._id.toString() : ret.id;
				delete ret._id;
				delete ret.__v;
				return ret;
			},
		},
		toObject: {
			virtuals: true,
			transform: (doc, ret) => {
				ret.id = ret._id ? ret._id.toString() : ret.id;
				delete ret._id;
				delete ret.__v;
				return ret;
			},
		},
	}
);

module.exports = mongoose.model("Space", spaceSchema);
