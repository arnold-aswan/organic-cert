import type { LucideIcon } from "lucide-react";

export interface AddEntityModalProps<T> {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	isEditing?: boolean;
	data?: T | null;
}

export interface DashAnalyticsCardProps {
	title: string;
	icon: LucideIcon;
	value: number | string;
	description: string;
}

export interface AnalyticsCardProps {
	value: number | string;
	title: string;
	icon: LucideIcon;
	iconColor?: string;
}

export type Farmer = {
	_id: string;
	fullname: string;
	farmCount: number;
	email: string;
	phone: string;
	county: string;
	status: string;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
};

type Pagination = {
	page: number;
	limit: number;
	totalPages: number;
	total: number;
};

export type FarmersResponse = {
	pagination: Pagination;
	farmers: Farmer[];
};

export type FarmsResponse = {
	pagination: Pagination;
	farms: Farm[];
};

export type FieldsResponse = {
	pagination: Pagination;
	fields: Field[];
};

export type Farm = {
	_id: string;
	name: string;
	farmerId: string;
	farmerName: string;
	fieldCount: number;
	location: string;
	area: number;
	status: "active" | "pending review" | "inactive";
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
};

export type Field = {
	_id: string;
	name: string;
	farmId: string;
	farmName: string;
	crop: string;
	area: number;
	status: "planted" | "growing" | "harvested" | "fallow";
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
};
