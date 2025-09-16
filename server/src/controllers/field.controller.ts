import { Request, Response } from "express";
import Farm from "../models/farm.model";
import Field from "../models/field.model ";

const addField = async (req: Request, res: Response): Promise<void> => {
	try {
		const { farmId, name, crop, area, status } = req.body;

		const existingFarm = await Farm.findById(farmId);
		if (!existingFarm) {
			res.status(404).json({ message: "farm not found!" });
			return;
		}

		const field = await Field.create({
			farmId,
			name,
			crop,
			area,
			status,
		});

		res.status(201).json({ message: "field added successfully", data: field });
		return;
	} catch (error) {
		console.error("Error adding field:", error);
		res.status(500).json({ message: "Internal server error" });
		return;
	}
};

const updateField = async (req: Request, res: Response): Promise<void> => {
	try {
		const { fieldId } = req.params;
		const { farmId, name, crop, area, status } = req.body;

		const updateField = await Field.findByIdAndUpdate(
			fieldId,
			{
				farmId,
				name,
				crop,
				area,
				status,
			},
			{ new: true, runValidators: true }
		);

		if (!updateField) {
			res.status(404).json({ message: "field not found!" });
			return;
		}

		res
			.status(200)
			.json({ message: "field updated successfully", data: updateField });
		return;
	} catch (error) {
		console.error("Error updating field:", error);
		res.status(500).json({ message: "Internal server error" });
		return;
	}
};

const deleteField = async (req: Request, res: Response): Promise<void> => {
	try {
		const { fieldId } = req.params;

		const deleteField = await Field.findByIdAndDelete(fieldId);

		if (!deleteField) {
			res.status(404).json({ message: "field does not exist!" });
			return;
		}

		res.status(200).json({ message: "field deleted successfully" });
		return;
	} catch (error) {
		console.error("Error deleting field:", error);
		res.status(500).json({ message: "Internal server error" });
		return;
	}
};

const getFields = async (req: Request, res: Response): Promise<void> => {
	try {
		const page = Number(req.query.page as string) || 1;
		const limit = 10;
		const skip = (page - 1) * limit;

		const [fields, total] = await Promise.all([
			await Field.find().skip(skip).limit(limit),
			Field.countDocuments(),
		]);

		res.status(200).json({
			pagination: {
				page,
				limit,
				totalPages: Math.ceil(total / limit),
				total,
			},
			fields,
		});
		return;
	} catch (error) {
		console.error("Error deleting field:", error);
		res.status(500).json({ message: "Internal server error" });
		return;
	}
};

export { addField, updateField, deleteField, getFields };
