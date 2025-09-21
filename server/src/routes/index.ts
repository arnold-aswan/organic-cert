import express from "express";
import farmerRoutes from "./farmer.route";
import farmRoutes from "./farms.route";
import fieldRoutes from "./fields.routes";
import complianceRoutes from "./compliance-questions.routes";
import inspectionRoutes from "./inspections.routes";
import certificateRoutes from "./certificates.route";
import agronomistRoutes from "./agronomist.route";
import dashboardRoutes from "./dashboard.route";

const router = express.Router();

router.use("/farmers", farmerRoutes);
router.use("/farms", farmRoutes);
router.use("/fields", fieldRoutes);
router.use("/compliance-questions", complianceRoutes);
router.use("/inspections", inspectionRoutes);
router.use("/certificates", certificateRoutes);
router.use("/agronomists", agronomistRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
