import { Request, Response } from "express";
import Farmer from "../models/farmer.model";
import Agronomist from "../models/agronomist.model";

const addAgronomist = async (req: Request, res: Response): Promise<void> => {
	try {
		const { fullname, email, phone, county, status } = req.body;

		const existingAgronomist = await Agronomist.findOne({
			$or: [{ email }, { phone }],
		});
		if (existingAgronomist) {
			res.status(400).json({
				message: "agronomist with this email or phone number already exists.",
			});
			return;
		}

		const agronomist = await Agronomist.create({
			fullname,
			email,
			phone,
			county,
			status,
		});

		res
			.status(201)
			.json({ message: "agronomist added successfully", data: agronomist });
		return;
	} catch (error) {
		console.error("Error creating agronomist:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

const updateAgronomist = async (req: Request, res: Response) => {
	try {
		const { agronomistId } = req.params;
		const { fullname, email, phone, county, status } = req.body;

		const updatedAgronomist = await Agronomist.findByIdAndUpdate(
			agronomistId,
			{
				fullname,
				email,
				phone,
				county,
				status,
			},
			{ new: true, runValidators: true }
		);

		if (!updatedAgronomist) {
			res.status(404).json({ message: "agronomist not found." });
			return;
		}

		res.status(200).json({
			message: "agronomist updated successfully.",
			data: updatedAgronomist,
		});
		return;
	} catch (error) {
		console.error("Error updating agronomist:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

const deleteAgronomist = async (req: Request, res: Response) => {
	try {
		const { agronomistId } = req.params;

		const deletedAgronomist = await Agronomist.findByIdAndDelete(agronomistId);

		if (!deletedAgronomist) {
			res.status(404).json({ message: "agronomist not found." });
			return;
		}

		res.status(200).json({
			message: "agronomist, their farms and fields deleted successfully.",
		});
		return;
	} catch (error) {
		console.error("Error deleting agronomist:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

const getAgronomists = async (req: Request, res: Response) => {
	try {
		const page = Number(req.query.page as string) || 1;
		const limit = 10;
		const skip = (page - 1) * limit;

		const [agronomists, total] = await Promise.all([
			await Agronomist.find()
				.skip(skip)
				.limit(limit)
				.sort({ createdAt: -1 })
				.lean(),
			Farmer.countDocuments(),
		]);

		res.status(200).json({
			pagination: {
				page,
				limit,
				totalPages: Math.ceil(total / limit),
				total,
			},
			agronomists,
		});
		return;
	} catch (error) {
		console.error("Error fetching agronomists:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

export { addAgronomist, updateAgronomist, deleteAgronomist, getAgronomists };
