import mongoose, { Schema } from "mongoose";

const complianceQuestionSchema = new Schema(
	{
		key: { type: String, required: true, unique: true },
		label: { type: String, required: true },
		description: { type: String },
		active: { type: Boolean, default: true },
	},
	{ timestamps: true }
);

const ComplianceQuestion = mongoose.model(
	"ComplianceQuestion",
	complianceQuestionSchema
);
export default ComplianceQuestion;
