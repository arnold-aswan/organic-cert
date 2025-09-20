import express from "express";
import {
	downloadCertificate,
	getCertificates,
} from "../controllers/certificate.controller";

const router = express.Router();

/**
 * @typedef Certificate
 * @property {string} _id - Certificate ID
 * @property {string} farmId - Farm reference ID
 * @property {string} inspectionId - Inspection reference ID
 * @property {string} certificateNo - Unique certificate number
 * @property {string} issueDate - Issue date (ISO format)
 * @property {string} expiryDate - Expiry date (ISO format)
 * @property {string} pdfUrl - Path/URL to the certificate PDF
 */

/**
 * GET /certificates
 * @summary Get all certificates
 * @tags Certificates
 * @return {array<Certificate>} 200 - List of certificates
 */
router.get("/", getCertificates);

/**
 * GET /certificates/:id/download
 * @summary Download a certificate PDF
 * @tags Certificates
 * @param {string} id.path.required - Certificate ID
 * @return {file} 200 - Certificate PDF
 */
router.get("/:certificateId/download", downloadCertificate);

export default router;
