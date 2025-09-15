import mongoose, { Schema } from "mongoose";

const certificateSchema = new Schema(
	{
		farmId: { type: Schema.Types.ObjectId, ref: "Farm", required: true },
		certificateNo: { type: String, required: true, unique: true },
		issueDate: { type: Date, required: true },
		expiryDate: { type: Date, required: true },
		pdfUrl: { type: String, required: true },
	},
	{ timestamps: true }
);

const Certificate = mongoose.model("Certificate", certificateSchema);
export default Certificate;
