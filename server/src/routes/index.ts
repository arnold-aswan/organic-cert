import express from "express";
import farmerRoutes from "./farmer.route";
import farmRoutes from "./farms.route";

const router = express.Router();

router.use("/farmers", farmerRoutes);
router.use("/farms", farmRoutes);

export default router;
