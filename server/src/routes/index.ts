import express from "express";
import farmerRoutes from "./farmer.route";
import farmRoutes from "./farms.route";
import fieldRoutes from "./fields.routes";

const router = express.Router();

router.use("/farmers", farmerRoutes);
router.use("/farms", farmRoutes);
router.use("/fields", fieldRoutes);

export default router;
