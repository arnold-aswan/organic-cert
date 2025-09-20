import mongoose, { Schema } from "mongoose";

const agronomistSchema = new Schema(
	{
		fullname: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: { type: String, required: true, unique: true },
		county: { type: String, required: true },
		status: { type: String, enum: ["active", "inactive"], default: "active" },
	},
	{ timestamps: true }
);

const Agronomist = mongoose.model("Agronomist", agronomistSchema);
export default Agronomist;
