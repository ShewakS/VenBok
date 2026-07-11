const mongoose = require("mongoose");

const timetableOverrideSchema = new mongoose.Schema(
	{
		spaceId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Space",
			required: true,
		},
		date: {
			type: String,
			required: true,
		},
		start: {
			type: String,
			required: true,
			match: /^([01]\d|2[0-3]):([0-5]\d)$/,
		},
		end: {
			type: String,
			required: true,
			match: /^([01]\d|2[0-3]):([0-5]\d)$/,
		},
		status: {
			type: String,
			required: true,
			default: "available",
			enum: ["academic", "available"],
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

timetableOverrideSchema.index({ spaceId: 1, date: 1 });
timetableOverrideSchema.index({ spaceId: 1 });
timetableOverrideSchema.index({ date: 1 });
timetableOverrideSchema.index({ status: 1 });

module.exports = mongoose.model("TimetableOverride", timetableOverrideSchema);
