import { Request, Response } from "express";
import Certificate from "../models/certificate.model";
import Farmer from "../models/farmer.model";
import ActivityLog from "../models/activity.model";

const dashboardAnalytics = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const [totalCertificates, totalFarmers] = await Promise.all([
			Certificate.countDocuments(),
			Farmer.find({ status: "active" }).countDocuments(),
		]);

		res.status(200).json({
			totalCertificates,
			totalFarmers,
		});
		return;
	} catch (error) {
		console.error("Error fetching dashboard analytics:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

const loggedActivities = async (req: Request, res: Response): Promise<void> => {
	try {
		const logs = await ActivityLog.find()
			.sort({ createdAt: -1 })
			.limit(5)
			.select("_id action title description createdAt")
			.lean();
		res.status(200).json({ message: "logs fetched successfully", data: logs });
		return;
	} catch (error) {
		console.error("Error fetching logs:", error);
		res.status(500).json({
			message: "Internal server error",
		});
		return;
	}
};

export { dashboardAnalytics, loggedActivities };
