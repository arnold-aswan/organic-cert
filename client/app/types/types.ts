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

export type InspectionsResponse = {
	pagination: Pagination;
	inspections: Inspection[];
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

export type Compliance = {
	q1: boolean;
	q2: boolean;
	q3: boolean;
	q4: boolean;
	q5: boolean;
};

export type Inspection = {
	_id: string;
	farmId: { farmId: string; name: string };
	inspectorName: string;
	inspectionDate: string;
	status: "Draft" | "Submitted" | "Approved" | "Rejected";
	notes: string;
	compliance: Compliance;
	complianceScore?: number;
	createdAt?: string;
	updatedAt?: string;
	__v?: number;
};

export type ComplianceQuestions = {
	key: string;
	label: string;
	description: string;
	answer: boolean;
};

export type ComplianceQuestionsResponse = ComplianceQuestions[];

export type InspectionsAnalyticsDataResponse = {
	totalInspections: number;
	approvedInspections: number;
	reviewInspections: number;
	averageComplianceScore: number;
};

export type FarmsAnalyticsDataResponse = {
	totalFarms: number;
	activeFarms: number;
	pendingFarms: number;
	totalHectares: number;
};

export type FieldsAnalyticsDataResponse = {
	totalFields: number;
	growingFields: number;
	harvestedFields: number;
	totalHectares: number;
};
