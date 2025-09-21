import express from "express";
import {
	dashboardAnalytics,
	loggedActivities,
} from "../controllers/dashboardd.controller";

const router = express.Router();

/**
 * A DashboardAnalytics type
 * @typedef {object} DashboardAnalytics
 * @property {number} totalCertificates - Total number of certificates
 * @property {number} totalFarmers - Total number of active farmers
 */

/**
 * An ActivityLog type
 * @typedef {object} ActivityLog
 * @property {string} _id - Activity log ID
 * @property {string} resourceType - Type of resource (Farmer, Farm, Inspection, Agronomist, Certificate)
 * @property {string} action - Action taken (created, updated, deleted, issued)
 * @property {string} resourceId - Linked resource ID
 * @property {string} title - Short title for the activity
 * @property {string} description - Detailed description of the activity
 * @property {string} createdAt - Timestamp when the activity was logged
 */

/**
 * GET /dashboard/analytics
 * @summary Get dashboard analytics
 * @tags Dashboard
 * @return {DashboardAnalytics} 200 - Analytics summary
 * @return {object} 500 - Internal server error
 */
router.get("/analytics", dashboardAnalytics);

/**
 * GET /dashboard/activities
 * @summary Get the latest 5 logged activities
 * @tags Dashboard
 * @return {array<ActivityLog>} 200 - List of latest activities
 * @return {object} 500 - Internal server error
 */
router.get("/activities", loggedActivities);

export default router;
