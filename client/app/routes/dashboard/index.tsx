import DashAnalyticsCard from "@/components/cards/dashboard/DashAnalyticsCard";
import React from "react";
import { Award, Trees, Users, Wheat } from "@/assets/icons";

const Dashboard = () => {
	return (
		<section className="space-y-6">
			<div>
				<h3 className="font-bold text-lg md:text-xl">Dashboard</h3>
				<span className="text-muted-foreground text-sm">
					Overview of your organic certification system.
				</span>
			</div>

			<div className="flex flex-col flex-wrap md:flex-row gap-4 md:gap-6 lg:gap-8">
				<DashAnalyticsCard
					title={"total farmers"}
					icon={Users}
					value={24}
					description={"active registered farmers"}
				/>

				<DashAnalyticsCard
					title={"certified farms"}
					icon={Trees}
					value={18}
					description={"organically certified farms"}
				/>

				<DashAnalyticsCard
					title={"fields monitored"}
					icon={Wheat}
					value={120}
					description={"fields under inspection"}
				/>

				<DashAnalyticsCard
					title={"certificates issued"}
					icon={Award}
					value={19}
					description={"valid certificates issued"}
				/>
			</div>
		</section>
	);
};

export default Dashboard;
