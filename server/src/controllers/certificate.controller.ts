import { Request, Response } from "express";
import Certificate from "../models/certificate.model";
import path from "path";
import fs from "fs";
import Inspection from "../models/inspection.model";

const getCertificates = async (req: Request, res: Response): Promise<void> => {
	try {
		const page = Number(req.query.page as string) || 1;
		const limit = 10;
		const skip = (page - 1) * limit;

		const [certificates, total] = await Promise.all([
			Certificate.find()
				.skip(skip)
				.limit(limit)
				.populate({
					path: "farmId",
					select: "name farmerId", // Get farm name and farmer ID
					populate: {
						path: "farmerId",
						select: "fullname", // Get farmer name
					},
				})
				.sort({ createdAt: -1 })
				.lean(),
			Certificate.countDocuments(),
		]);

		// Get compliance scores for all farms from their latest inspections
		const farmIds = certificates.map((cert) => cert.farmId._id);
		const inspections = await Inspection.aggregate([
			{ $match: { farmId: { $in: farmIds } } },
			{ $sort: { createdAt: -1 } }, // Sort by latest first
			{
				$group: {
					_id: "$farmId",
					latestComplianceScore: { $first: "$complianceScore" },
					latestInspectionDate: { $first: "$createdAt" },
				},
			},
		]);

		// Create a map for quick lookup of compliance scores
		const complianceMap = new Map();
		inspections.forEach((inspection) => {
			complianceMap.set(
				inspection._id.toString(),
				inspection.latestComplianceScore
			);
		});

		// Add compliance scores to the certificates
		const certificatesWithCompliance = certificates.map((cert: any) => {
			const farm = cert.farmId as any; // Type assertion for populated farm
			const farmer = farm.farmerId as any; // Type assertion for populated farmer

			return {
				certificateNo: cert.certificateNo,
				farmName: farm.name,
				farmerName: farmer.fullname,
				issueDate: cert.issueDate,
				expiryDate: cert.expiryDate,
				complianceScore: complianceMap.get(farm._id.toString()) || null,
				pdfUrl: cert.pdfUrl,
				_id: cert._id,
			};
		});

		res.status(200).json({
			pagination: {
				page,
				totalPages: Math.ceil(total / limit),
				total,
				limit,
			},
			certificates: certificatesWithCompliance,
		});
	} catch (error) {
		console.error("Error fetching certificates:", error);
		res.status(500).json({
			success: false,
			message: "Failed to fetch certificates",
		});
	}
};

const downloadCertificate = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { certificateId } = req.params;

		const certificate = await Certificate.findById(certificateId);
		if (!certificate) {
			res.status(404).json({ message: "Certificate not found!" });
			return;
		}

		const filePath = path.resolve(certificate.pdfUrl);
		if (!fs.existsSync) {
			res.status(404).json({ message: "PDF file not found" });
			return;
		}

		res.download(filePath, `${certificate.certificateNo}.pdf`);
		return;
	} catch (error) {
		console.error("Error downloading certificate:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};
export { getCertificates, downloadCertificate };
