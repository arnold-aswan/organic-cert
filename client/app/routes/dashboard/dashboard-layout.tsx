import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import { Outlet } from "react-router";

const DashboardLayout = () => {
	return (
		<SidebarProvider>
			<div className="flex min-h-screen w-full">
				<AppSidebar />
				<div className="flex flex-col flex-1">
					<Header />
					<main className="p-4 w-full xl:max-w-5xl">
						<Outlet />
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
};

export default DashboardLayout;
