import React from "react";
import {
	Award,
	ChartColumnIncreasing,
	ClipboardCheck,
	Trees,
	Users,
	Wheat,
	UserPlus,
} from "@/assets/icons";
import { type LucideIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
	to: string;
	label: string;
	icon: LucideIcon;
};

const SidebarNav = ({ isOpen }: { isOpen: boolean }) => {
	const location = useLocation();
	const navigate = useNavigate();

	const navItems: NavItem[] = [
		{ label: "Dashboard", to: "/", icon: ChartColumnIncreasing },
		{ label: "Farmers", to: "/farmers", icon: Users },
		{ label: "Farms", to: "/farms", icon: Trees },
		{ label: "Fields", to: "/fields", icon: Wheat },
		{ label: "Inspections", to: "/inspections", icon: ClipboardCheck },
		{ label: "Certificates", to: "/certificates", icon: Award },
		{ label: "Agronomists", to: "/agronomists", icon: UserPlus },
	];

	return (
		<nav className="flex flex-col space-y-2 p-2">
			{navItems.map((item) => {
				const Icon = item.icon;
				const isActive = location.pathname === item.to;

				const handleClick = () => navigate(item.to);

				return (
					<Button
						key={item.to}
						variant={isActive ? "outline" : "ghost"}
						className={cn(
							"w-full",
							!isOpen ? "justify-center" : "justify-start",
							isActive && "bg-green-500/20 text-black font-medium"
						)}
						onClick={handleClick}
					>
						<Icon className={cn("size-4 ", isOpen && "mr-2")} />
						{isOpen && <span>{item.label}</span>}
					</Button>
				);
			})}
		</nav>
	);
};

export default SidebarNav;
