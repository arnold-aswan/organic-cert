import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type ComplianceAnswers = Record<"q1" | "q2" | "q3" | "q4" | "q5", boolean>;

const expectedAnswers: ComplianceAnswers = {
	q1: false,
	q2: true,
	q3: true,
	q4: true,
	q5: true,
};

export const calculateComplianceScore = (
	compliance: ComplianceAnswers
): number => {
	const totalQuestions = Object.keys(compliance).length;

	const correctCount = (
		Object.keys(compliance) as (keyof ComplianceAnswers)[]
	).filter((key) => compliance[key] === expectedAnswers[key]).length;

	const scorePerQuestion = 100 / totalQuestions;

	return correctCount * scorePerQuestion;
};

export const complianceColor = (score: number) => {
	if (score >= 80) {
		return "text-green-600";
	} else if (score >= 50) {
		return "text-yellow-600";
	} else {
		return "text-red-600";
	}
};

export const statusColor = (status: string): string => {
	if (status.toLowerCase() === "active") {
		return "bg-green-600 text-white";
	} else {
		return "bg-gray-300 text-black";
	}
};
