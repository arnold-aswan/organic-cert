import { SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

const Header = () => {
	return (
		<header className="w-full flex items-center p-2 border-b">
			<SidebarTrigger />
			<div className="pl-3">
				<h1 className="text-lg md:text-xl font-bold">
					Agro-Organic Certification Dashboard
				</h1>
				<span className="text-muted-foreground text-sm">
					Manage farmers, farms, fields and certifications.
				</span>
			</div>
		</header>
	);
};

export default Header;
