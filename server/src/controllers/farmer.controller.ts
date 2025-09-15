import { Request, Response } from "express";
import Farmer from "../models/farmer.model";

const addFarmer = async (req: Request, res: Response): Promise<void> => {
	try {
		const { fullname, email, phone, county, status } = req.body;

		const existingFarmer = await Farmer.findOne({
			$or: [{ email }, { phone }],
		});
		if (existingFarmer) {
			res.status(400).json({
				message: "farmer with this email or phone number already exists.",
			});
			return;
		}

		const farmer = await Farmer.create({
			fullname,
			email,
			phone,
			county,
			status,
		});

		res
			.status(201)
			.json({ message: "farmer added successfully", data: farmer });
		return;
	} catch (error) {
		console.error("Error creating farmer:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

const updateFarmer = async (req: Request, res: Response) => {
	try {
		const { farmerId } = req.params;
		const { fullname, email, phone, county, status } = req.body;

		const updatedFarmer = await Farmer.findByIdAndUpdate(
			farmerId,
			{
				fullname,
				email,
				phone,
				county,
				status,
			},
			{ new: true, runValidators: true }
		);

		if (!updatedFarmer) {
			res.status(404).json({ message: "Farmer not found." });
			return;
		}

		res.status(200).json({
			message: "farmer updated successfully.",
			data: updatedFarmer,
		});
		return;
	} catch (error) {
		console.error("Error updating farmer:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

const deleteFarmer = async (req: Request, res: Response) => {
	try {
		const { farmerId } = req.params;

		const deletedFarmer = await Farmer.findByIdAndDelete(farmerId);

		if (!deletedFarmer) {
			res.status(404).json({ message: "Farmer not found." });
			return;
		}

		res.status(204).json({
			message: "farmer updated successfully.",
		});
		return;
	} catch (error) {
		console.error("Error deleting farmer:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

const getFarmers = async (req: Request, res: Response) => {
	try {
		const page = Number(req.query.page as string) || 1;
		const limit = 10;
		const skip = (page - 1) * limit;

		const [farmers, total] = await Promise.all([
			await Farmer.find().skip(skip).limit(limit),
			Farmer.countDocuments(),
		]);

		res.status(200).json({
			page,
			limit,
			totalPages: Math.ceil(total / limit),
			totalFarmers: total,
			farmers,
		});
		return;
	} catch (error) {
		console.error("Error fetching farmers:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

export { addFarmer, updateFarmer, deleteFarmer, getFarmers };
