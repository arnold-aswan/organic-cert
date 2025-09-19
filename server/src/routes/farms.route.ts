import express from "express";
import { validate } from "../middlewares/validate";
import {
	deleteFarmSchema,
	farmSchema,
	getFarmsSchema,
	updateFarmSchema,
} from "../libs/validate-schema";
import {
	addFarm,
	deleteFarm,
	farmAnalytics,
	getFarms,
	updateFarm,
} from "../controllers/farm.controller";

const router = express.Router();

/**
 * A Farm type
 * @typedef {object} Farm
 * @property {string} name.required - Farm name
 * @property {string} farmerId.required - Linked Farmer ID (ObjectId)
 * @property {string} location.required - Farm location
 * @property {number} area.required - Farm size in hectares
 * @property {string} status - Farm status (active, pending review, inactive)
 * @enum {string} status.active
 * @enum {string} status["pending review"]
 * @enum {string} status.inactive
 */

/**
 * POST /farms/create
 * @summary Create a new farm
 * @tags Farms
 * @param {Farm} request.body.required - Farm info
 * @return {Farm} 201 - Created farm
 */
router.post("/create", validate(farmSchema), addFarm);

/**
 * PUT /farms/{farmId}
 * @summary Update a farm
 * @tags Farms
 * @param {string} farmId.path.required - Farm ID
 * @param {Farm} request.body.required - Updated farm data
 * @return {Farm} 200 - Updated farm
 */
router.put("/:farmId", validate(updateFarmSchema), updateFarm);

/**
 * DELETE /farms/{farmId}
 * @summary Delete a farm
 * @tags Farms
 * @param {string} farmId.path.required - Farm ID
 * @return {object} 200 - Success message
 */
router.delete("/:farmId", validate(deleteFarmSchema), deleteFarm);

/**
 * GET /farms
 * @summary Get all farms
 * @tags Farms
 * @return {array<Farm>} 200 - List of farms
 */
router.get("/", validate(getFarmsSchema), getFarms);

/**
 * GET /farms/analytics
 * @summary Get farms analytics
 * @tags Analytics
 * @return {object} 200 - Analytics summary
 * @example response - 200 - success
 * {
 *   "totalFarms": 12,
 *   "activeFarms": 7,
 *   "pendingFarms": 3,
 *   "totalHectares": 82
 * }
 */
router.get("/analytics", farmAnalytics);

export default router;
