import express from "express";
import { validate } from "../middlewares/validate";
import {
	deleteFarmerSchema,
	farmerSchema,
	getFarmersSchema,
	updateFarmerSchema,
} from "../libs/validate-schema";
import {
	addFarmer,
	deleteFarmer,
	getFarmers,
	updateFarmer,
} from "../controllers/farmer.controller";

const router = express.Router();

/**
 * A Farmer type
 * @typedef {object} Farmer
 * @property {string} fullname - Farmer full name
 * @property {string} email - Farmer email
 * @property {string} phone - Farmer phone number
 * @property {string} county - Farmer county
 * @property {string} status - Farmer status (active/inactive)
 */

/**
 * POST /farmers/create
 * @summary Create a new farmer
 * @tags Farmers
 * @param {Farmer} request.body.required - Farmer info
 * @return {Farmer} 201 - Created farmer
 */
router.post("/create", validate(farmerSchema), addFarmer);

/**
 * PUT /farmers/{farmerId}
 * @summary Update a farmer
 * @tags Farmers
 * @param {string} farmerId.path.required - Farmer ID
 * @param {Farmer} request.body.required - Updated farmer data
 * @return {Farmer} 200 - Updated farmer
 */
router.put("/:farmerId", validate(updateFarmerSchema), updateFarmer);

/**
 * DELETE /farmers/{farmerId}
 * @summary Delete a farmer
 * @tags Farmers
 * @param {string} farmerId.path.required - Farmer ID
 * @return {object} 200 - Success message
 */
router.delete("/:farmerId", validate(deleteFarmerSchema), deleteFarmer);

/**
 * GET /farmers
 * @summary Get all farmers
 * @tags Farmers
 * @return {array<Farmer>} 200 - List of farmers
 */
router.get("/", validate(getFarmersSchema), getFarmers);

export default router;
