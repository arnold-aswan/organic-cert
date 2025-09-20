import type { ComplianceQuestions } from "@/types/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

type Compliance = Record<string, boolean>;
type ComplianceQuestion = {
	key: string;
	answer: boolean;
};

export const calculateComplianceScore = (
	compliance: Compliance,
	quiz: ComplianceQuestion[] = []
): number => {
	if (!quiz.length) return 0;

	let correct = 0;

	quiz.forEach((q) => {
		if (compliance[q.key] === q.answer) {
			correct++;
		}
	});

	return Math.round((correct / quiz.length) * 100);
};

export function buildDefaultCompliance(questions: ComplianceQuestions[]) {
	return questions.reduce(
		(acc, q) => {
			acc[q.key] = false;
			return acc;
		},
		{} as Record<string, boolean>
	);
}

type ComplianceItem = { key: string; value: boolean; _id?: string };
type Compliance2 = ComplianceItem[];

// Frontend form shape
type ComplianceForm = Record<string, boolean>;
// Convert backend array -> form object
export const normalizeCompliance = (compliance: any) => {
	return compliance.reduce((acc, item) => {
		acc[item.key] = item.value;
		return acc;
	}, {} as ComplianceForm);
};

export const complianceColor = (score?: number) => {
	if (!score) return;
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

export const certificateStatus = (expiryDate: string): string => {
	const today = new Date();
	const expiry = new Date(expiryDate);

	return today > expiry ? "expired" : "active";
};

export const formatISODate = (isoDate: string): string => {
	return new Date(isoDate).toISOString().split("T")[0];
};
