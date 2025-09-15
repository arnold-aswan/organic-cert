import mongoose, { Schema } from "mongoose";

const farmSchema = new Schema(
	{
		name: { type: String, required: true },
		farmerId: {
			type: Schema.Types.ObjectId,
			ref: "Farmer",
			required: true,
		},
		location: { type: String, required: true },
		area: { type: Number, required: true }, // in HA
		status: {
			type: String,
			enum: ["active", "pending review", "inactive"],
			default: "active",
		},
	},
	{ timestamps: true }
);

const Farm = mongoose.model("Farm", farmSchema);
export default Farm;
