import { z } from "zod";

const KENYA_PHONE_REGEX = /^(?:\+254|0)?7\d{8}$/;

export const complianceQuestions = [
	{
		key: "q1",
		label: "Any synthetic inputs in the last 36 months?",
		description: 'Should be "No" for organic certification',
	},
	{
		key: "q2",
		label: "Adequate buffer zones?",
		description: "Required to prevent contamination from non-organic sources",
	},
	{
		key: "q3",
		label: "Organic seed or permitted exceptions?",
		description:
			"Organic seeds must be used when available, exceptions allowed if not available",
	},
	{
		key: "q4",
		label: "Compost/soil fertility managed organically?",
		description: "Only approved organic methods",
	},
	{
		key: "q5",
		label: "Record keeping/logs available?",
		description: "Complete records required for certification",
	},
] as const;

export const addFarmerSchema = z.object({
	fullname: z
		.string()
		.min(3, { message: "Full name is required" })
		.max(36, { message: "Full name is too long" })
		.trim(),
	email: z.email({ message: "Invalid email address" }),
	phone: z.string().regex(KENYA_PHONE_REGEX, {
		message: "Phone must be a valid E.164 number (e.g. +2547XXXXXXXX)",
	}),
	county: z
		.string()
		.min(3, { message: "County is required" })
		.max(56, { message: "County name is too long" })
		.trim(),
	status: z.enum(["active", "inactive"]),
});

export const addFarmSchema = z.object({
	farmName: z
		.string()
		.min(3, { message: "Farm name is required" })
		.max(50, { message: "Farm name is too long" })
		.trim(),
	farmerId: z.string().min(1, { message: "Farmer ID is required" }).trim(),
	location: z.string().min(3, { message: "Location is required" }).trim(),
	area: z.number().min(1, { message: "Area must be at least 1 Ha" }),
	status: z.enum(["active", "pending review", "inactive"]),
});

export const addFieldSchema = z.object({
	fieldName: z
		.string()
		.min(3, { message: "Field name is required" })
		.max(50, { message: "Field name is too long" })
		.trim(),
	farmId: z.string().min(1, { message: "Farm ID is required" }).trim(),
	crop: z.string().min(3, { message: "Crop is required" }).trim(),
	area: z.number().min(1, { message: "Area must be at least 1 Ha" }),
	status: z.enum(["planted", "growing", "harvested", "fallow"]),
});

export const inspectionSchema = z.object({
	farmId: z.string().min(1, { message: "Farm ID is required" }).trim(),
	inspectionDate: z.string().refine(
		(val) => {
			const date = new Date(val);
			const today = new Date();
			today.setHours(0, 0, 0, 0);
			return date >= today;
		},
		{
			message: "Inspection date cannot be in the past",
		}
	),
	inspectorName: z
		.string()
		.min(3, { message: "Inspector name is required" })
		.max(50, { message: "Inspector name is too long" })
		.trim(),
	findings: z
		.string()
		.max(1000, { message: "Findings are too long" })
		.trim()
		.optional(),
	status: z.enum(["passed", "failed", "pending"]),
	compliance: z.object({
		q1: z.boolean(),
		q2: z.boolean(),
		q3: z.boolean(),
		q4: z.boolean(),
		q5: z.boolean(),
	}),
});

export type AddFarmerSchema = z.infer<typeof addFarmerSchema>;
export type AddFarmSchema = z.infer<typeof addFarmSchema>;
export type AddFieldSchema = z.infer<typeof addFieldSchema>;
export type InspectionSchema = z.infer<typeof inspectionSchema>;
