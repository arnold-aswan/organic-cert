import type { LucideIcon } from "lucide-react";

export interface AddEntityModalProps {
	isOpen: boolean;
	setIsOpen: (open: boolean) => void;
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
