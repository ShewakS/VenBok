const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			minlength: 1,
			maxlength: 120,
		},
		type: {
			type: String,
			required: true,
			enum: ["Seminar", "Club", "Workshop", "Hackathon", "Training"],
		},
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
		participants: {
			type: Number,
			required: true,
			min: 1,
		},
		organizedBy: {
			type: String,
			default: "",
			maxlength: 100,
		},
		notes: {
			type: String,
			default: "",
		},
		requestedBy: {
			type: String,
			default: "Campus User",
			maxlength: 80,
		},
		requestedRole: {
			type: String,
			default: "",
			enum: ["admin", "faculty", "student", "coordinator", ""],
		},
		status: {
			type: String,
			default: "Pending",
			enum: ["Pending", "Approved", "Rejected"],
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

bookingSchema.index({ spaceId: 1, date: 1, start: 1, end: 1 });
bookingSchema.index({ spaceId: 1 });
bookingSchema.index({ date: 1 });
bookingSchema.index({ status: 1 });

module.exports = mongoose.model("Booking", bookingSchema);
