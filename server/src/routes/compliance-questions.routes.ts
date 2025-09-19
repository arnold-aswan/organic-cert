import express from "express";
import { validate } from "../middlewares/validate";
import { complianceQuestionsSchema } from "../libs/validate-schema";
import { getComplianceQuestions } from "../controllers/compliance-questions.controller";

const router = express.Router();

/**
 * A Compliance Question
 * @typedef {object} ComplianceQuestion
 * @property {string} key.required - Unique key (e.g. "q1")
 * @property {string} label.required - Question text
 * @property {string} description - Additional context or guidance
 * @property {boolean} expectedAnswer - Expected boolean value to pass (true/false)
 */

/**
 * GET /compliance-questions
 * @summary Get compliance checklist questions
 * @tags Compliance
 * @return {array<ComplianceQuestion>} 200 - List of compliance questions
 */
router.get("/", getComplianceQuestions);

export default router;
