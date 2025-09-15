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
	getFarms,
	updateFarm,
} from "../controllers/farm.controller";

const router = express.Router();

router.post("/create", validate(farmSchema), addFarm);
router.put("/:farmId", validate(updateFarmSchema), updateFarm);
router.delete("/:farmId", validate(deleteFarmSchema), deleteFarm);
router.get("/", validate(getFarmsSchema), getFarms);

export default router;
