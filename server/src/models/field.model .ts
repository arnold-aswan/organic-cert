import mongoose, { Schema } from "mongoose";

const fieldSchema = new Schema(
	{
		name: { type: String, required: true },
		farmId: {
			type: Schema.Types.ObjectId,
			ref: "Farm",
			required: true,
		},
		area: { type: Number, required: true }, // in HA
		crop: [{ type: String }],
		status: {
			type: String,
			enum: ["planted", "growing", "harvested", "fallow"],
			default: "planted",
		},
	},
	{ timestamps: true }
);

const Field = mongoose.model("Field", fieldSchema);
export default Field;
