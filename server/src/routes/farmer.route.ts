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

router.post("/create", validate(farmerSchema), addFarmer);
router.put("/:farmerId", validate(updateFarmerSchema), updateFarmer);
router.delete("/:farmerId", validate(deleteFarmerSchema), deleteFarmer);
router.get("/", validate(getFarmersSchema), getFarmers);

export default router;
