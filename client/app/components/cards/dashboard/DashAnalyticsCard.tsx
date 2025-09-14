import { Card, CardContent } from "@/components/ui/card";
import type { DashAnalyticsCardProps } from "@/types/types";

const DashAnalyticsCard = ({
	title,
	icon: Icon,
	value,
	description,
}: DashAnalyticsCardProps) => {
	return (
		<Card className="w-full max-w-48 md:max-w-56 py-5 rounded-md">
			<CardContent className="space-y-1">
				<div className="flex items-center justify-between">
					<p className="text-xs text-muted-foreground font-semibold capitalize">
						{title}
					</p>
					<Icon
						className="text-green-500"
						size={16}
					/>
				</div>
				<p className="font-bold text-lg">{value}</p>
				<p className="text-xs text-muted-foreground">{description}</p>
			</CardContent>
		</Card>
	);
};

export default DashAnalyticsCard;
