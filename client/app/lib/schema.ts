import { z } from "zod";

const KENYA_PHONE_REGEX = /^(?:\+254|0)?7\d{8}$/;

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
	country: z
		.string()
		.min(3, { message: "Country is required" })
		.max(56, { message: "Country name is too long" })
		.trim(),
	status: z.enum(["active", "inactive"]),
});

export type AddFarmerSchema = z.infer<typeof addFarmerSchema>;

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

export type AddFarmSchema = z.infer<typeof addFarmSchema>;

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

export type AddFieldSchema = z.infer<typeof addFieldSchema>;
