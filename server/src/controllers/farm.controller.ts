import { Request, Response } from "express";
import Farmer from "../models/farmer.model";
import Farm from "../models/farm.model";
import Field from "../models/field.model ";

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
			.json({ message: "farm updated successfully", data: updateFarm });
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

		await Field.deleteMany({ farmId });

		res
			.status(200)
			.json({ message: "Farm and it's fields deleted successfully" });
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
			await Farm.find()
				.skip(skip)
				.limit(limit)
				.populate("farmerId", "fullname")
				.lean(),
			Farm.countDocuments(),
		]);

		// Add field counts
		const farmIds = farms.map((farm) => farm._id);
		// count how many fields belong to each farm
		const fieldCounts = await Field.aggregate([
			{ $match: { farmId: { $in: farmIds } } },
			{ $group: { _id: "$farmId", count: { $sum: 1 } } }, // => [{_id:"mongo id", "count": 2}]
		]);

		// Map counts back into farms
		const countsMap = fieldCounts.reduce(
			(acc, { _id, count }) => ({ ...acc, [_id.toString()]: count }),
			{} as Record<string, number>
		);

		const farmsData = farms.map((farm) => ({
			...farm,
			farmerId: farm._id,
			farmerName: (farm.farmerId as any)?.fullname ?? null,
			fieldCount: countsMap[farm._id.toString()] ?? 0,
		}));

		res.status(200).json({
			pagination: {
				page,
				limit,
				totalPages: Math.ceil(total / limit),
				total,
			},
			farms: farmsData,
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
