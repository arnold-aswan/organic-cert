import express from "express";
import farmerRoutes from "./farmer.route";
import farmRoutes from "./farms.route";
import fieldRoutes from "./fields.routes";
import complianceRoutes from "./compliance-questions.routes";
import inspectionRoutes from "./inspections.routes";

const router = express.Router();

router.use("/farmers", farmerRoutes);
router.use("/farms", farmRoutes);
router.use("/fields", fieldRoutes);
router.use("/compliance-questions", complianceRoutes);
router.use("/inspections", inspectionRoutes);

export default router;
