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
});

export type AddFarmerSchema = z.infer<typeof addFarmerSchema>;
