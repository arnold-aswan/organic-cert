import { Request, Response } from "express";
import Farmer from "../models/farmer.model";
import Farm from "../models/farm.model";
import Field from "../models/field.model ";

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

		// .distinct => only gets farm IDs owned by this farmer
		const farmIds = await Farm.distinct("_id", { farmerId });

		await Farm.deleteMany({ farmerId });

		if (farmIds.length > 0) {
			await Field.deleteMany({ farmId: { $in: farmIds } });
		}

		res.status(200).json({
			message: "farmer, their farms and fields deleted successfully.",
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
			await Farmer.find()
				.skip(skip)
				.limit(limit)
				.sort({ createdAt: -1 })
				.lean(),
			Farmer.countDocuments(),
		]);

		// collect farmer IDs
		const farmerIds = farmers.map((farmer) => farmer._id);

		// count farms per farmer
		const farmCounts = await Farm.aggregate([
			{ $match: { farmerId: { $in: farmerIds } } },
			{ $group: { _id: "$farmerId", count: { $sum: 1 } } },
		]);

		// map results
		const countsMap = farmCounts.reduce(
			(acc, { _id, count }) => ({ ...acc, [_id.toString()]: count }),
			{} as Record<string, number>
		);

		// attach counts
		const farmersDetails = farmers.map((farmer) => ({
			...farmer,
			farmCount: countsMap[farmer._id.toString()] ?? 0,
		}));

		res.status(200).json({
			pagination: {
				page,
				limit,
				totalPages: Math.ceil(total / limit),
				total,
			},
			farmers: farmersDetails,
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
