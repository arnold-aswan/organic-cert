import mongoose, { Schema } from "mongoose";

const activitySchema = new Schema(
	{
		action: {
			type: String,
			required: true,
			enum: ["created", "updated", "deleted", "issued"],
		},
		resourceType: {
			type: String,
			required: true,
			enum: [
				"Farmer",
				"Farm",
				"Field",
				"Inspection",
				"Agronomist",
				"Certificate",
			],
		},
		resourceId: {
			type: Schema.Types.ObjectId,
			required: true,
		},
		title: { type: String, required: true },
		description: { type: String, required: true },
	},

	{ timestamps: true }
);

const ActivityLog = mongoose.model("ActivityLog", activitySchema);
export default ActivityLog;
