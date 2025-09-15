import mongoose, { Schema } from "mongoose";

const inspectionSchema = new Schema(
	{
		farmId: {
			type: Schema.Types.ObjectId,
			ref: "Farm",
			required: true,
		},
		date: { type: Date, required: true, default: Date.now },
		inspectorName: { type: String, required: true },
		status: {
			type: String,
			enum: ["Draft", "Submitted", "Approved", "Rejected"],
			default: "Draft",
		},
		complianceScore: {
			type: Number,
			min: 0,
			max: 0,
			required: true,
		},
	},
	{ timestamps: true }
);

const Inspection = mongoose.model("Inspection", inspectionSchema);
export default Inspection;
