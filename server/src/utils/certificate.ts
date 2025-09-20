import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import Farm from "../models/farm.model";

const STORAGE_PATH = path.join(__dirname, "../../storage/certificates");

interface CertificateData {
	farmId: string;
	inspectorName: string;
	inspectionDate: Date;
	complianceScore: number;
	certificateNo: string;
	issueDate: Date;
	expiryDate: Date;
	farmName?: string;
	farmerName?: string;
}

// Ensure storage folder exists
if (!fs.existsSync(STORAGE_PATH)) {
	fs.mkdirSync(STORAGE_PATH, { recursive: true });
}

// Helper to generate PDF
const generateCertificatePDF = async (data: CertificateData) => {
	const farm = await Farm.findById(data.farmId).populate(
		"farmerId",
		"fullname"
	);

	if (!farm) {
		throw new Error("Farm not found");
	}

	const filePath = path.join(STORAGE_PATH, `${data.certificateNo}.pdf`);
	const doc = new PDFDocument();

	doc.pipe(fs.createWriteStream(filePath));

	// --- Certificate Content ---
	doc.fontSize(20).text("Certified Organic Certificate", { align: "center" });
	doc.moveDown();
	doc.fontSize(14).text(`Farmer: ${(farm.farmerId as any).fullname}`);
	doc.text(`Farm: ${farm.name}`);
	doc.text(`Inspector: ${data.inspectorName}`);
	doc.text(`Inspection Date: ${data.inspectionDate.toDateString()}`);
	doc.text(`Compliance Score: ${data.complianceScore}%`);
	doc.text(`Certificate #: ${data.certificateNo}`);
	doc.text(`Issue Date: ${data.issueDate.toDateString()}`);
	doc.text(`Expiry Date: ${data.expiryDate.toDateString()}`);
	doc.moveDown();
	doc.text("Certified Organic ✅", { align: "center" });
	doc.moveDown();
	doc.text("Inspector Signature: ____________________", { align: "left" });

	doc.end();

	// Return relative URL for frontend
	return `/storage/certificates/${data.certificateNo}.pdf`;
};

export { generateCertificatePDF };
