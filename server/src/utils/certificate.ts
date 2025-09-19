import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

const STORAGE_PATH = path.join(__dirname, "../../storage/certificates");

// Ensure storage folder exists
if (!fs.existsSync(STORAGE_PATH)) {
	fs.mkdirSync(STORAGE_PATH, { recursive: true });
}

// Helper to generate PDF
const generateCertificatePDF = async (inspection: any) => {
	const filePath = path.join(STORAGE_PATH, `${inspection._id}.pdf`);
	const doc = new PDFDocument();

	doc.pipe(fs.createWriteStream(filePath));

	// --- Certificate Content ---
	doc.fontSize(20).text("Certified Organic Certificate", { align: "center" });
	doc.moveDown();
	doc.fontSize(14).text(`Farmer: ${inspection.farmId.farmerName}`);
	doc.text(`Farm: ${inspection.farmId.name}`);
	doc.text(`Inspector: ${inspection.inspectorName}`);
	doc.text(`Inspection Date: ${inspection.inspectionDate}`);
	doc.text(`Compliance Score: ${inspection.complianceScore}%`);
	doc.text(`Certificate #: CERT-${inspection._id}`);
	doc.text(`Issue Date: ${new Date().toDateString()}`);
	doc.text(
		`Expiry Date: ${new Date(
			new Date().setFullYear(new Date().getFullYear() + 1)
		).toDateString()}`
	);
	doc.moveDown();
	doc.text("Certified Organic ✅", { align: "center" });
	doc.moveDown();
	doc.text("Inspector Signature: ____________________", { align: "left" });

	doc.end();

	// Return relative URL for frontend
	return `/storage/certificates/${inspection._id}.pdf`;
};

export { generateCertificatePDF };
