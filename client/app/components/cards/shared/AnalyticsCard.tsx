import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { AnalyticsCardProps } from "@/types/types";

const AnalyticsCard = ({
	value,
	title,
	icon: Icon,
	iconColor,
}: AnalyticsCardProps) => {
	return (
		<Card className="w-full max-w-48 md:max-w-56 py-3 rounded-md">
			<CardContent className="flex items-center gap-2">
				<Icon
					className={cn(iconColor ? iconColor : "text-green-500")}
					size={32}
				/>
				<div>
					<p className="font-bold text-lg">{value}</p>
					<p className="text-xs text-muted-foreground capitalize">{title}</p>
				</div>
			</CardContent>
		</Card>
	);
};

export default AnalyticsCard;
