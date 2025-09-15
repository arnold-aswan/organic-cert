import { Request, Response } from "express";
import Farmer from "../models/farmer.model";
import Farm from "../models/farm.model";

const addFarm = async (req: Request, res: Response): Promise<void> => {
	try {
		const { farmerId, name, location, area, status } = req.body;

		const farmer = await Farmer.findById(farmerId);
		if (!farmer) {
			res.status(400).json({ message: "farmer not found!" });
			return;
		}

		const farm = await Farm.create({
			name,
			farmerId,
			location,
			area,
			status,
		});

		res.status(201).json({ message: "farm created successfully", data: farm });
		return;
	} catch (error) {
		console.error("Error creating farm:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

const updateFarm = async (req: Request, res: Response): Promise<void> => {
	try {
		const { farmId } = req.params;
		const { farmerId, name, location, area, status } = req.body;

		const updateFarm = await Farm.findByIdAndUpdate(
			farmId,
			{
				farmerId,
				name,
				location,
				area,
				status,
			},
			{ new: true, runValidators: true }
		);

		if (!updateFarm) {
			res.status(404).json({ message: "farm does not exist!" });
			return;
		}

		res
			.status(200)
			.json({ message: "farm created successfully", data: updateFarm });
		return;
	} catch (error) {
		console.error("Error updating farm:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

const deleteFarm = async (req: Request, res: Response): Promise<void> => {
	try {
		const { farmId } = req.params;

		const deleteFarm = await Farm.findByIdAndDelete(farmId);

		if (!deleteFarm) {
			res.status(404).json({ message: "farm does not exist!" });
			return;
		}

		res.status(204).json({ message: "farm created successfully" });
		return;
	} catch (error) {
		console.error("Error creating farmer:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

const getFarms = async (req: Request, res: Response): Promise<void> => {
	try {
		const page = Number(req.query.page as string) || 1;
		const limit = 10;
		const skip = (page - 1) * limit;

		const [farms, total] = await Promise.all([
			await Farm.find().skip(skip).limit(limit),
			Farm.countDocuments(),
		]);

		res.status(200).json({
			page,
			limit,
			totalPages: Math.ceil(total / limit),
			totalFarms: total,
			farms,
		});
		return;
	} catch (error) {
		console.error("Error fetching farms:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

export { addFarm, updateFarm, deleteFarm, getFarms };
