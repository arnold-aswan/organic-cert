import mongoose, { Schema } from "mongoose";

const inspectionSchema = new Schema(
	{
		farmId: {
			type: Schema.Types.ObjectId,
			ref: "Farm",
			required: true,
		},
		inspectionDate: { type: Date, required: true, default: Date.now },
		inspectorName: { type: String, required: true },
		status: {
			type: String,
			enum: ["Draft", "Submitted", "Approved", "Rejected"],
			default: "Draft",
		},
		compliance: [
			{
				key: { type: String, required: true },
				value: { type: Boolean, required: true },
			},
		],
		complianceScore: {
			type: Number,
			min: 0,
			max: 100,
			required: true,
		},
		notes: { type: String },
	},
	{ timestamps: true }
);

const Inspection = mongoose.model("Inspection", inspectionSchema);
export default Inspection;
