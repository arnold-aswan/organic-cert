import { Request, Response } from "express";
import Inspection from "../models/inspection.model";
import {
	calculateComplianceScore,
	normalizeCompliance,
} from "../utils/compliance";
import Certificate from "../models/certificate.model";
import { generateCertificatePDF } from "../utils/certificate";

const createInspection = async (req: Request, res: Response): Promise<void> => {
	try {
		const { farmId, inspectorName, inspectionDate, status, compliance } =
			req.body;

		let finalStatus = status;
		const complianceArray = normalizeCompliance(compliance);
		const complianceScore = calculateComplianceScore(complianceArray);

		if (finalStatus.toLowerCase() === "submitted") {
			finalStatus = complianceScore >= 80 ? "Approved" : "Rejected";
		}

		const inspection = await Inspection.create({
			farmId,
			inspectorName,
			inspectionDate,
			status: finalStatus,
			compliance: complianceArray,
			complianceScore,
		});

		if (finalStatus === "Approved") {
			const certificateNo = `CERT-${Date.now()}`;
			const issueDate = new Date();
			const expiryDate = new Date(issueDate);
			expiryDate.setFullYear(issueDate.getFullYear() + 1);

			const pdfPath = await generateCertificatePDF({
				farmId: farmId.toString(),
				inspectorName,
				inspectionDate: new Date(inspectionDate),
				complianceScore,
				certificateNo,
				issueDate,
				expiryDate,
			});

			await Certificate.create({
				farmId,
				certificateNo,
				issueDate,
				expiryDate,
				pdfUrl: pdfPath,
			});
		}

		res
			.status(201)
			.json({ message: "inspection added successfully.", data: inspection });
		return;
	} catch (error) {
		console.error("Error creating inspection:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

const updateInspection = async (req: Request, res: Response): Promise<void> => {
	try {
		const { inspectionId } = req.params;
		const updates = req.body;

		const inspection = await Inspection.findById(inspectionId);
		if (!inspection) {
			res.status(404).json({ message: "Inspection not found" });
			return;
		}

		if (["Approved", "Rejected"].includes(inspection.status)) {
			res
				.status(400)
				.json({ message: "Inspection cannot be edited once finalized" });
			return;
		}

		if (updates.compliance) {
			const complianceArray = normalizeCompliance(updates.compliance);
			updates.complianceScore = calculateComplianceScore(complianceArray);
		}
		if (updates.status && updates.status.toLowerCase() === "submitted") {
			const scoreToCheck =
				updates.complianceScore ?? inspection.complianceScore ?? 0;
			updates.status = scoreToCheck >= 80 ? "Approved" : "Rejected";
		}

		const updatedInspection = await Inspection.findByIdAndUpdate(
			inspectionId,
			updates,
			{
				new: true,
			}
		);

		if (updates.status === "Approved") {
			const certificateNo = `CERT-${Date.now()}`;
			const issueDate = new Date();
			const expiryDate = new Date(issueDate);
			expiryDate.setFullYear(issueDate.getFullYear() + 1);

			const pdfPath = await generateCertificatePDF({
				farmId: updatedInspection!.farmId.toString(),
				inspectorName: updatedInspection!.inspectorName,
				inspectionDate: updatedInspection!.inspectionDate,
				complianceScore: updatedInspection!.complianceScore,
				certificateNo,
				issueDate,
				expiryDate,
			});

			await Certificate.create({
				farmId: updatedInspection!.farmId,
				certificateNo,
				issueDate,
				expiryDate,
				pdfUrl: pdfPath,
			});
		}

		res.status(200).json({
			message: "Inspection updated successfully",
			data: updatedInspection,
		});
		return;
	} catch (error) {
		console.error("Error updating inspection:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

const getInspections = async (req: Request, res: Response): Promise<void> => {
	try {
		const page = Number(req.query.page) || 1;
		const limit = 10;
		const skip = (page - 1) * limit;

		const [inspections, total] = await Promise.all([
			Inspection.find()
				.skip(skip)
				.limit(limit)
				.populate("farmId", "name")
				.sort({ createdAt: -1 }),
			Inspection.countDocuments(),
		]);

		res.status(200).json({
			pagination: { page, limit, totalPages: Math.ceil(total / limit), total },
			inspections,
		});

		return;
	} catch (error) {
		console.error("Error fetching inspection:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

const inspectionsAnalytics = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const [
			totalInspections,
			approvedInspections,
			reviewInspections,
			avgCompliance,
		] = await Promise.all([
			Inspection.countDocuments(),
			Inspection.find({ status: "Approved" }).countDocuments(),
			Inspection.find({ status: "Draft" }).countDocuments(),
			Inspection.aggregate([
				{
					$group: {
						_id: null,
						avgScore: { $avg: "$complianceScore" },
					},
				},
			]),
		]);

		res.status(200).json({
			totalInspections,
			approvedInspections,
			reviewInspections,
			averageComplianceScore:
				avgCompliance.length > 0 ? avgCompliance[0].avgScore : 0,
		});
		return;
	} catch (error) {
		console.error("Error fetching inspection analytics:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

export {
	createInspection,
	updateInspection,
	getInspections,
	inspectionsAnalytics,
};
