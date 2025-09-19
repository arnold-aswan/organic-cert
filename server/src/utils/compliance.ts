import { complianceQuestions } from "../constants/data";

export const calculateComplianceScore = (
	answers: { key: string; value: boolean }[]
) => {
	const totalQuestions = complianceQuestions.length;

	let passed = 0;

	complianceQuestions.forEach((question) => {
		const answer = answers.find((a) => a.key === question.key);
		if (answer && answer.value === question.answer) {
			passed += 1;
		}
	});

	return totalQuestions > 0 ? Math.round((passed / totalQuestions) * 100) : 0;
};

export const normalizeCompliance = (complianceObj: Record<string, boolean>) => {
	return Object.entries(complianceObj).map(([key, value]) => ({
		key,
		value,
	}));
};
