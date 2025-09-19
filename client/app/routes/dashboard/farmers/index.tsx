import { Button } from "@/components/ui/button";
import { PlusCircle, SquarePen, Trash2 } from "@/assets/icons";
import AddFarmer from "@/components/modals/farmers/AddFarmer";
import { useState } from "react";

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
import { cn, statusColor } from "@/lib/utils";
import { useDeleteFarmersMutation, useGetFarmers } from "@/hooks/useFarmers";
import type { Farmer, FarmersResponse } from "@/types/types";
import { toast } from "sonner";
import Pagination from "@/components/shared/Pagination";
import { farmersTableHeads } from "@/constants/data";

const Farmers = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [selectedFarmer, setSelectedFarmer] = useState<Farmer | null>(null);
	const [page, setPage] = useState(1);

	const limit = 10;

	const { data: farmersData, isPending } = useGetFarmers(page, limit) as {
		data: FarmersResponse;
		isPending: boolean;
	};
	const { mutate: deleteFarmer, isPending: isDeleting } =
		useDeleteFarmersMutation();

	const updateFarmerDetails = (id: string) => {
		setIsOpen(true);
		setIsEditing(true);

		const selected =
			farmersData?.farmers?.find((farmer: Farmer) => farmer._id === id) || null;
		setSelectedFarmer(selected);
	};

	const onDeleteFarmer = (id: string) => {
		deleteFarmer(
			{ farmerId: id },
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
					<h3 className="font-bold text-lg md:text-xl">Farmers</h3>
					<span className="text-muted-foreground text-sm">
						Manage registered farmers and their information.
					</span>
				</div>

				<Button
					className="bg-green-500 text-white cursor-pointer flex items-center gap-2"
					onClick={() => {
						setIsEditing(false);
						setIsOpen(true);
						setSelectedFarmer(null);
					}}
				>
					<PlusCircle />
					Add Farmer
				</Button>

				<AddFarmer
					key={selectedFarmer?._id ?? "new"}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					isEditing={isEditing}
					data={selectedFarmer}
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
							<TableCaption>List of all farmers.</TableCaption>
							<TableHeader>
								<TableRow>
									{farmersTableHeads?.map((head) => (
										<TableHead className="table-head whitespace-nowrap">
											{head.value}
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{farmersData?.farmers?.map((farmer) => (
									<TableRow key={farmer._id}>
										<TableCell>{farmer.fullname}</TableCell>
										<TableCell>{farmer.email}</TableCell>
										<TableCell>{farmer.phone}</TableCell>
										<TableCell>{farmer.county}</TableCell>
										<TableCell>{farmer.farmCount}</TableCell>
										<TableCell>
											<span
												className={cn(
													statusColor(farmer.status),
													"rounded-full px-2 py-1 text-xs font-semibold"
												)}
											>
												{farmer.status}
											</span>
										</TableCell>
										<TableCell className="flex items-center gap-4">
											<Button
												size="sm"
												className="bg-transparent text-black modal-close-btn"
												onClick={() => updateFarmerDetails(farmer._id)}
											>
												<SquarePen />
											</Button>

											<Button
												size="sm"
												className="bg-transparent text-red-500 hover:bg-green-900/10"
												onClick={() => onDeleteFarmer(farmer._id)}
											>
												<Trash2 />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TableCell colSpan={farmersTableHeads.length}>
										<div className="flex justify-center">
											{farmersData?.pagination && (
												<Pagination
													currentPage={farmersData.pagination.page}
													totalPages={farmersData.pagination.totalPages}
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

export default Farmers;
