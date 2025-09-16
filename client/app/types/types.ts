import type { LucideIcon } from "lucide-react";

export interface AddEntityModalProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
	isEditing?: boolean;
	farmer?: Farmer | null;
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
