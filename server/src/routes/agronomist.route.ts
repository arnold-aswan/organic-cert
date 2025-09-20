import express from "express";
import { validate } from "../middlewares/validate";
import {
	deleteAgronomistSchema,
	farmerSchema,
	getFarmersSchema,
	updateAgronomistSchema,
} from "../libs/validate-schema";
import {
	addAgronomist,
	deleteAgronomist,
	getAgronomists,
	updateAgronomist,
} from "../controllers/agronomist.controller";

const router = express.Router();

/**
 * An Agronomist type
 * @typedef {object} Agronomist
 * @property {string} fullname - Agronomist full name
 * @property {string} email - Agronomist email
 * @property {string} phone - Agronomist phone number
 * @property {string} county - Agronomist county
 * @property {string} status - Agronomist status (active/inactive)
 */

/**
 * POST /agronomist/create
 * @summary Create a new agronomist
 * @tags Agronomist
 * @param {Agronomist} request.body.required - Agronomist info
 * @return {Agronomist} 201 - Created agronomist
 */
router.post("/create", validate(farmerSchema), addAgronomist);

/**
 * PUT /agronomists/{agronomistId}
 * @summary Update an agronomist
 * @tags Agronomist
 * @param {string} agronomistId.path.required - Agronomist ID
 * @param {Agronomist} request.body.required - Updated farmer data
 * @return {Agronomist} 200 - Updated agronomist
 */
router.put(
	"/:agronomistId",
	validate(updateAgronomistSchema),
	updateAgronomist
);

/**
 * DELETE /agronomists/{agronomistId}
 * @summary Delete an agronomist
 * @tags Agronomist
 * @param {string} agronomistId.path.required - Agronomist ID
 * @return {object} 200 - Success message
 */
router.delete(
	"/:agronomistId",
	validate(deleteAgronomistSchema),
	deleteAgronomist
);

/**
 * GET /agronomists
 * @summary Get all agronomists
 * @tags Agronomist
 * @return {array<Agronomist>} 200 - List of agronomist
 */
router.get("/", validate(getFarmersSchema), getAgronomists);

export default router;
