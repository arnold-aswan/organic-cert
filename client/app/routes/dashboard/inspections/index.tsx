import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	ChartPie,
	ClipboardCheck,
	ClipboardClock,
	ClipboardList,
	PlusCircle,
	SquarePen,
} from "@/assets/icons";
import AddInspection from "@/components/modals/inspections/Inspection";
import AnalyticsCard from "@/components/cards/shared/AnalyticsCard";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { inspectionsTableHeads } from "@/constants/data";
import { cn, complianceColor } from "@/lib/utils";
import type {
	Inspection as InspectionProps,
	InspectionsAnalyticsDataResponse,
	InspectionsResponse,
} from "@/types/types";
import {
	useGetInspections,
	useGetInspectionsAnalytics,
} from "@/hooks/useInspections";
import { format } from "date-fns";
import Loading from "@/components/shared/Loading";
import Pagination from "@/components/shared/Pagination";

const Inspections = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [selectedInspection, setSelectedInspection] =
		useState<InspectionProps | null>(null);
	const [page, setPage] = useState(1);
	const limit = 10;

	const { data: inspectionsAnalyticsData, isPending: loadingAnalytics } =
		useGetInspectionsAnalytics() as {
			data: InspectionsAnalyticsDataResponse;
			isPending: boolean;
		};
	const { data: inspectionsData, isPending } = useGetInspections(
		page,
		limit
	) as {
		data: InspectionsResponse;
		isPending: boolean;
	};

	const updateInspectionDetails = (id: string) => {
		setIsOpen(true);
		setIsEditing(true);

		const selected =
			inspectionsData?.inspections?.find(
				(inspection: InspectionProps) => inspection._id === id
			) || null;
		setSelectedInspection(selected);
	};

	if (isPending) return <div>Loading...</div>;

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

				<AddInspection
					key={selectedInspection?._id ?? "new"}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					isEditing={isEditing}
					data={selectedInspection}
				/>
			</div>

			{loadingAnalytics ? (
				<div className="flex flex-col gap-2 items-center">
					<Loading />
					<p>Loading analytics data...</p>
				</div>
			) : (
				<div className="flex flex-col flex-wrap md:flex-row gap-4 md:gap-6 lg:gap-8">
					<AnalyticsCard
						value={inspectionsAnalyticsData?.totalInspections}
						title="total inspections"
						icon={ClipboardList}
						iconColor={"text-blue-400"}
					/>

					<AnalyticsCard
						value={inspectionsAnalyticsData?.approvedInspections}
						title="approved"
						icon={ClipboardCheck}
					/>

					<AnalyticsCard
						value={inspectionsAnalyticsData?.reviewInspections}
						title="under review"
						icon={ClipboardClock}
						iconColor={"text-yellow-400"}
					/>

					<AnalyticsCard
						value={`${inspectionsAnalyticsData?.averageComplianceScore?.toFixed(2)}%`}
						title="avg compliance score"
						icon={ChartPie}
						iconColor={"text-indigo-400"}
					/>
				</div>
			)}

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
									{inspectionsTableHeads.map((entry) => (
										<TableHead
											key={entry.value}
											className="table-head whitespace-nowrap"
										>
											{entry.value}
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{inspectionsData?.inspections?.map((entry) => (
									<TableRow key={entry._id}>
										<TableCell>{entry.farmId.name}</TableCell>
										<TableCell>{format(entry.inspectionDate, "P")}</TableCell>
										<TableCell>{entry.inspectorName}</TableCell>

										<TableCell
											className={cn(complianceColor(entry.complianceScore))}
										>
											{entry.complianceScore}%
										</TableCell>
										<TableCell>{entry.status}</TableCell>
										<TableCell>
											<Button
												size="sm"
												className="bg-transparent text-black modal-close-btn"
												onClick={() => updateInspectionDetails(entry._id)}
												disabled={entry.status.toLowerCase() !== "draft"}
											>
												<SquarePen />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TableCell colSpan={inspectionsTableHeads.length}>
										<div className="flex justify-center">
											{inspectionsData?.pagination && (
												<Pagination
													currentPage={inspectionsData.pagination.page}
													totalPages={inspectionsData.pagination.totalPages}
													onPageChange={(newPage) => setPage(newPage)}
												/>
											)}
										</div>
									</TableCell>
								</TableRow>
							</TableFooter>
						</Table>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Inspections;
