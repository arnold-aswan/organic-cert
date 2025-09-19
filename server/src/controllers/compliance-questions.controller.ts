import { Request, Response } from "express";
import { complianceQuestions } from "../constants/data";
import { complianceQuestionsSchema } from "../libs/validate-schema";

export const getComplianceQuestions = (req: Request, res: Response) => {
	res.status(200).json(complianceQuestions);
};
