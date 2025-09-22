const { describe, expect, it } = require("@jest/globals");

const calculateComplianceScore = (compliance, quiz = []) => {
	if (!quiz.length) return 0;

	let correct = 0;
	quiz.forEach((q) => {
		if (compliance[q.key] === q.answer) correct++;
	});

	return Math.round((correct / quiz.length) * 100);
};

describe("calculateComplianceScore", () => {
	const quiz = [
		{ key: "q1", answer: false },
		{ key: "q2", answer: true },
		{ key: "q3", answer: true },
		{ key: "q4", answer: false },
		{ key: "q5", answer: true },
	];

	it("it should return 0 when no quiz is provided", () => {
		const compliance = {};
		expect(calculateComplianceScore(compliance, [])).toBe(0);
	});

	it("it should return 100 when all answers match", () => {
		const compliance = {
			q1: false,
			q2: true,
			q3: true,
			q4: false,
			q5: true,
		};
		expect(calculateComplianceScore(compliance, quiz)).toBe(100);
	});

	it("should return 60 when 3 out of 5 answers match", () => {
		const compliance = {
			q1: true, // wrong
			q2: true, // correct
			q3: false, // wrong
			q4: false, // correct
			q5: true, // correct
		};
		expect(calculateComplianceScore(compliance, quiz)).toBe(60);
	});
});
