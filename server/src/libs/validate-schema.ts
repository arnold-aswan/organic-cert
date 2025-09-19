import { z } from "zod";

const KENYA_PHONE_REGEX = /^(?:\+254|0)?7\d{8}$/;
// FARMER SCHEMA
const farmerBodySchema = z.object({
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

const farmerSchema = z.object({
	body: farmerBodySchema,
});

const updateFarmerSchema = z.object({
	body: farmerBodySchema,
	params: z.object({ farmerId: z.string() }),
});

const deleteFarmerSchema = z.object({
	params: z.object({ farmerId: z.string() }),
});

const getFarmersSchema = z.object({
	query: z.object({
		page: z.string().regex(/^\d+$/).transform(Number).optional(),
	}),
});

// FARM SCHEMA

const farmBodySchema = z.object({
	name: z
		.string()
		.min(3, { message: "Farm name is required" })
		.max(50, { message: "Farm name is too long" })
		.trim(),
	farmerId: z.string().min(1, { message: "Farmer ID is required" }).trim(),
	location: z.string().min(3, { message: "Location is required" }).trim(),
	area: z.number().min(1, { message: "Area must be at least 1 Ha" }),
	status: z.enum(["active", "pending review", "inactive"]),
});

const farmSchema = z.object({
	body: farmBodySchema,
});

const updateFarmSchema = z.object({
	body: farmBodySchema,
	params: z.object({ farmId: z.string() }),
});

const deleteFarmSchema = z.object({
	params: z.object({ farmId: z.string() }),
});

const getFarmsSchema = z.object({
	query: z.object({
		page: z.string().regex(/^\d+$/).transform(Number).optional(),
	}),
});

// FIELD SCHEMA
const fieldBodySchema = z.object({
	name: z
		.string()
		.min(3, { message: "Field name is required" })
		.max(50, { message: "Field name is too long" })
		.trim(),
	farmId: z.string().min(1, { message: "Farm ID is required" }).trim(),
	crop: z.string().min(3, { message: "Crop is required" }).trim(),
	area: z.number().min(1, { message: "Area must be at least 1 Ha" }),
	status: z.enum(["planted", "growing", "harvested", "fallow"]),
});

const fieldSchema = z.object({
	body: fieldBodySchema,
});

const updateFieldSchema = z.object({
	body: fieldBodySchema,
	params: z.object({ fieldId: z.string() }),
});

const deleteFieldSchema = z.object({
	params: z.object({ fieldId: z.string() }),
});

const getFieldsSchema = z.object({
	query: z.object({
		page: z.string().regex(/^\d+$/).transform(Number).optional(),
	}),
});

// INSPECTION SCHEMA
const inspectionsSchema = z.object({
	farmId: z.string().min(1, { message: "Farm ID is required" }),
	inspectionDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
		message: "Invalid date format",
	}),
	inspectorName: z.string().min(3, { message: "Inspector name is required" }),
	status: z
		.enum(["Draft", "Submitted", "Approved", "Rejected"])
		.default("Draft"),
	compliance: z.object({
		q1: z.boolean(),
		q2: z.boolean(),
		q3: z.boolean(),
		q4: z.boolean(),
		q5: z.boolean(),
	}),
	notes: z.string().optional(),
});

const inspectionSchema = z.object({
	body: inspectionsSchema,
});
// COMPLIANCE SCHEMA
const complianceQuestionsSchema = z.object({
	key: z.string(),
	label: z.string(),
	description: z.string(),
	expectedAnswer: z.boolean(),
});

export {
	farmerSchema,
	updateFarmerSchema,
	deleteFarmerSchema,
	getFarmersSchema,
	farmSchema,
	updateFarmSchema,
	deleteFarmSchema,
	getFarmsSchema,
	fieldSchema,
	updateFieldSchema,
	deleteFieldSchema,
	getFieldsSchema,
	complianceQuestionsSchema,
	inspectionSchema,
};
