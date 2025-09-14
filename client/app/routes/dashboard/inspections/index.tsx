import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	ChartPie,
	ClipboardCheck,
	ClipboardClock,
	ClipboardList,
	PlusCircle,
} from "@/assets/icons";
import Inspection from "@/components/modals/inspections/Inspection";
import AnalyticsCard from "@/components/cards/shared/AnalyticsCard";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { inspectionData } from "@/constants/data";
import { cn, complianceColor } from "@/lib/utils";

const Inspections = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<section className="space-y-6">
			<div className="flex flex-col items-start gap-3 xl:flex-row xl:items-center xl:justify-between ">
				<div>
					<h3 className="font-bold text-lg md:text-xl">Inspections</h3>
					<span className="text-muted-foreground text-sm">
						Create and manage farm inspections and compliance scores.
					</span>
				</div>

				<Button
					className="bg-green-500 text-white flex items-center gap-2"
					onClick={() => setIsOpen(true)}
				>
					<PlusCircle />
					New Inspection
				</Button>

				<Inspection
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				/>
			</div>

			<div className="flex flex-col flex-wrap md:flex-row gap-4 md:gap-6 lg:gap-8">
				<AnalyticsCard
					value={24}
					title="total inspections"
					icon={ClipboardList}
					iconColor={"text-blue-400"}
				/>

				<AnalyticsCard
					value={24}
					title="approved"
					icon={ClipboardCheck}
				/>

				<AnalyticsCard
					value={24}
					title="under review"
					icon={ClipboardClock}
					iconColor={"text-yellow-400"}
				/>

				<AnalyticsCard
					value={"85%"}
					title="avg compliance score"
					icon={ChartPie}
					iconColor={"text-indigo-400"}
				/>
			</div>

			<div className="w-full max-w-full overflow-hidden">
				<div
					className="overflow-x-auto border rounded-lg"
					style={{
						WebkitOverflowScrolling: "touch",
						overscrollBehaviorX: "contain",
						maxWidth: "calc(100vw - 2rem)",
					}}
				>
					<div className="min-w-full">
						<Table className="w-full  border-collapse">
							<TableCaption>List of all inspections.</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className="table-head whitespace-nowrap">
										Farm
									</TableHead>
									<TableHead className="table-head whitespace-nowrap">
										Farmer
									</TableHead>
									<TableHead className="table-head whitespace-nowrap">
										Inspection Date
									</TableHead>
									<TableHead className="table-head whitespace-nowrap">
										Inspector
									</TableHead>
									<TableHead className="table-head whitespace-nowrap">
										Compliance Score
									</TableHead>
									<TableHead className="table-head whitespace-nowrap">
										Status
									</TableHead>
									<TableHead className="table-head whitespace-nowrap">
										Action
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{inspectionData.map((entry) => (
									<TableRow key={entry.id}>
										<TableCell>{entry.farm}</TableCell>
										<TableCell>{entry.farmer}</TableCell>
										<TableCell>{entry.inspectionDate}</TableCell>
										<TableCell>{entry.inspector}</TableCell>
										<TableCell
											className={cn(complianceColor(entry.complianceScore))}
										>
											{entry.complianceScore}%
										</TableCell>
										<TableCell>{entry.status}</TableCell>
										<TableCell>
											<Button
												size="sm"
												variant="outline"
											>
												View
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Inspections;
