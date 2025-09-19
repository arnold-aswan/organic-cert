import express from "express";
import { validate } from "../middlewares/validate";
import { inspectionSchema } from "../libs/validate-schema";
import {
	createInspection,
	getInspections,
	inspectionsAnalytics,
	updateInspection,
} from "../controllers/inspection.controller";

const router = express.Router();

/**
 * An Inspection type
 * @typedef {object} Inspection
 * @property {string} farmId.required - Linked Farm ID (ObjectId)
 * @property {string} inspectionDate.required - Date of inspection (YYYY-MM-DD)
 * @property {string} inspectorName.required - Name of the inspector
 * @property {string} status - Inspection status (Draft, Submitted, Approved, Rejected)
 * @enum {string} status.Draft
 * @enum {string} status.Submitted
 * @enum {string} status.Approved
 * @enum {string} status.Rejected
 * @property {object} compliance.required - Compliance answers object
 * @property {boolean} compliance.q1 - Any synthetic inputs in the last 36 months?
 * @property {boolean} compliance.q2 - Adequate buffer zones?
 * @property {boolean} compliance.q3 - Organic seed or permitted exceptions?
 * @property {boolean} compliance.q4 - Compost/soil fertility managed organically?
 * @property {boolean} compliance.q5 - Recordkeeping/logs available?
 * @property {number} complianceScore - Calculated compliance score (%)
 */

/**
 * POST /inspections
 * @summary Create a new inspection
 * @tags Inspections
 * @param {Inspection} request.body.required - Inspection info
 * @return {Inspection} 201 - Created inspection
 */
router.post("/create", validate(inspectionSchema), createInspection);

/**
 * PUT /inspections/{inspectionId}
 * @summary Update inspection
 * @tags Inspections
 * @param {string} inspectionId.path.required - Inspection ID
 * @param {Inspection} request.body.required - Inspection update data
 * @return {Inspection} 200 - Updated inspection
 */
router.put(
	"/:inspectionId",
	validate(inspectionSchema.partial()),
	updateInspection
);

/**
 * GET /inspections
 * @summary Get all inspections
 * @tags Inspections
 * @return {array<Inspection>} 200 - List of inspections
 */
router.get("/", getInspections);

/**
 * GET /inspections/analytics
 * @summary Get inspections analytics
 * @tags Analytics
 * @return {object} 200 - Analytics summary
 * @example response - 200 - success
 * {
 *   "totalInspections": 12,
 *   "approvedInspections": 7,
 *   "reviewInspections": 3,
 *   "averageComplianceScore": 82.5
 * }
 */
router.get("/analytics", inspectionsAnalytics);

export default router;
