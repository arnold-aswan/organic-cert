import DashAnalyticsCard from "@/components/cards/dashboard/DashAnalyticsCard";
import { Award, Trees, Users } from "@/assets/icons";
import {
	useGetDashActivities,
	useGetDashAnalytics,
} from "@/hooks/useDashboard";
import Loading from "@/components/shared/Loading";
import type { DashActivities, DashAnalytics } from "@/types/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDistanceToNow } from "date-fns";

const Dashboard = () => {
	const { data: dashAnalytics, isPending } = useGetDashAnalytics() as {
		data: DashAnalytics;
		isPending: boolean;
	};
	const { data: dashActivities, isPending: isLoading } =
		useGetDashActivities() as {
			data: DashActivities;
			isPending: boolean;
		};

	return (
		<section className="space-y-6">
			<div>
				<h3 className="font-bold text-lg md:text-xl">Dashboard</h3>
				<span className="text-muted-foreground text-sm">
					Overview of your organic certification system.
				</span>
			</div>

			{isPending ? (
				<div className="flex flex-col gap-2 items-center">
					<Loading />
					<p>Loading analytics data...</p>
				</div>
			) : (
				<div className="flex flex-col flex-wrap md:flex-row gap-4 md:gap-6 lg:gap-8">
					<DashAnalyticsCard
						title={"total farmers"}
						icon={Users}
						value={dashAnalytics?.totalFarmers}
						description={"active registered farmers"}
					/>

					<DashAnalyticsCard
						title={"certified farms"}
						icon={Trees}
						value={dashAnalytics?.totalCertificates}
						description={"organically certified farms"}
					/>

					<DashAnalyticsCard
						title={"certificates issued"}
						icon={Award}
						value={dashAnalytics?.totalCertificates}
						description={"valid certificates issued"}
					/>
				</div>
			)}

			<Card className="max-w-[30rem]">
				<CardHeader>
					<CardTitle>Recent Activity</CardTitle>
				</CardHeader>

				{isLoading ? (
					<div className="flex flex-col gap-2 items-center">
						<Loading />
						<p>Loading recent activities...</p>
					</div>
				) : (
					<CardContent>
						{dashActivities?.data?.map((data) => (
							<div
								key={data._id}
								className="flex items-start gap-3 border-b last:border-none pb-3"
							>
								<div className="mt-1 w-2 h-2 rounded-full bg-green-500" />
								<div>
									<p className="font-medium text-sm">{data.title}</p>
									<p className="text-xs text-muted-foreground">
										{data.description} •{" "}
										{formatDistanceToNow(new Date(data.createdAt), {
											addSuffix: true,
										})}
									</p>
								</div>
							</div>
						))}
					</CardContent>
				)}
			</Card>
		</section>
	);
};

export default Dashboard;
