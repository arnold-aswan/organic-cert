import mongoose, { Schema } from "mongoose";

const farmerSchema = new Schema(
	{
		fullname: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		phone: { type: String, required: true, unique: true },
		county: { type: String, required: true },
		status: { type: String, enum: ["active", "inactive"], default: "active" },
	},
	{ timestamps: true }
);

const Farmer = mongoose.model("Farmer", farmerSchema);
export default Farmer;
