import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	CircleDot,
	PlusCircle,
	SquarePen,
	Tractor,
	Trash2,
	Trees,
	Vegan,
} from "@/assets/icons";
import AddFarm from "@/components/modals/farms/AddFarm";
import type {
	Farm,
	FarmsAnalyticsDataResponse,
	FarmsResponse,
} from "@/types/types";
import {
	useDeleteFarmMutation,
	useGetFarms,
	useGetFarmsAnalytics,
} from "@/hooks/useFarms";
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
import Pagination from "@/components/shared/Pagination";
import { toast } from "sonner";
import { farmsTableHeads } from "@/constants/data";
import Loading from "@/components/shared/Loading";
import AnalyticsCard from "@/components/cards/shared/AnalyticsCard";

const Farms = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [selectedFarm, setSelectedFarm] = useState<Farm | null>(null);
	const [page, setPage] = useState(1);
	const limit = 10;

	const { data: farmsAnalyticsData, isPending: loadingAnalytics } =
		useGetFarmsAnalytics() as {
			data: FarmsAnalyticsDataResponse;
			isPending: boolean;
		};

	const { data: farmsData, isPending } = useGetFarms(page, limit) as {
		data: FarmsResponse;
		isPending: boolean;
	};

	const { mutate: deleteFarm, isPending: isDeleting } = useDeleteFarmMutation();

	const updateFarmDetails = (id: string) => {
		setIsOpen(true);
		setIsEditing(true);

		const selected =
			farmsData?.farms?.find((farm: Farm) => farm._id === id) || null;
		setSelectedFarm(selected);
	};

	const onDeleteFarm = (id: string) => {
		deleteFarm(
			{ farmId: id },
			{
				onSuccess: (data: any) => {
					toast.success(data.message);
				},
				onError: (error: any) => {
					const errorMessage = error.response.data.message;
					toast.error(errorMessage);
				},
			}
		);
	};

	if (isPending) return <div>Loading...</div>;

	return (
		<section className="space-y-6">
			<div className="flex flex-col items-start gap-3 xl:flex-row xl:items-center xl:justify-between ">
				<div>
					<h3 className="font-bold text-lg md:text-xl">Farms</h3>
					<span className="text-muted-foreground text-sm">
						Manage farms and their operational details.
					</span>
				</div>

				<Button
					className="bg-green-500 text-white cursor-pointer flex items-center gap-2"
					onClick={() => setIsOpen(true)}
				>
					<PlusCircle />
					Add Farm
				</Button>

				<AddFarm
					key={selectedFarm?._id ?? "new"}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					isEditing={isEditing}
					data={selectedFarm}
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
						value={farmsAnalyticsData?.totalFarms}
						title="total farms"
						icon={Trees}
					/>

					<AnalyticsCard
						value={farmsAnalyticsData?.activeFarms}
						title="active farms"
						icon={Tractor}
					/>

					<AnalyticsCard
						value={farmsAnalyticsData?.pendingFarms}
						title="pending review"
						icon={Vegan}
						iconColor={"text-yellow-400"}
					/>

					<AnalyticsCard
						value={farmsAnalyticsData?.totalHectares}
						title="total hectares"
						icon={CircleDot}
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
							<TableCaption>List of all farms.</TableCaption>
							<TableHeader>
								<TableRow>
									{farmsTableHeads?.map((data) => (
										<TableHead className="table-head whitespace-nowrap">
											{data.value}
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{farmsData?.farms?.map((farm) => (
									<TableRow key={farm._id}>
										<TableCell>{farm.name}</TableCell>
										<TableCell>{farm.farmerName}</TableCell>
										<TableCell>{farm.location}</TableCell>
										<TableCell>{farm.area}</TableCell>
										<TableCell>{farm.fieldCount}</TableCell>
										<TableCell>{farm.status}</TableCell>
										<TableCell className="flex items-center gap-4">
											<Button
												size="sm"
												className="bg-transparent text-black modal-close-btn"
												onClick={() => updateFarmDetails(farm._id)}
											>
												<SquarePen />
											</Button>

											<Button
												size="sm"
												className="bg-transparent text-red-500 hover:bg-green-900/10"
												onClick={() => onDeleteFarm(farm._id)}
											>
												<Trash2 />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TableCell colSpan={farmsTableHeads.length}>
										<div className="flex justify-center">
											{farmsData?.pagination && (
												<Pagination
													currentPage={farmsData.pagination.page}
													totalPages={farmsData.pagination.totalPages}
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

export default Farms;
