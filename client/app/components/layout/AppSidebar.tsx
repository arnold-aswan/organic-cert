import React from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	useSidebar,
} from "@/components/ui/sidebar";
import SidebarNav from "./SidebarNav";
import { Sprout } from "@/assets/icons";

const AppSidebar = () => {
	const { open } = useSidebar();

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="flex flex-row items-center gap-3">
				<div className="bg-green-500 rounded-md w-fit p-1">
					<Sprout color={"white"} />
				</div>
				{open && (
					<p className="font-bold text-2xl text-green-500">Agro-Organic</p>
				)}
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarNav isOpen={open} />
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter />
		</Sidebar>
	);
};

export default AppSidebar;
