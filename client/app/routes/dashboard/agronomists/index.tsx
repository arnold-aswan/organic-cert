import { Button } from "@/components/ui/button";
import { PlusCircle, SquarePen, Trash2 } from "@/assets/icons";
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
import type { Agronomist, AgronomistsResponse } from "@/types/types";
import { toast } from "sonner";
import Pagination from "@/components/shared/Pagination";
import { agronomistsTableHeads } from "@/constants/data";
import {
	useDeleteAgronomistsMutation,
	useGetAgronomists,
} from "@/hooks/useAgronomists";
import AddAgronomist from "@/components/modals/agronomists/AddAgronomist";

const Agronomists = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [selectedAgronomist, setSelectedAgronomist] =
		useState<Agronomist | null>(null);
	const [page, setPage] = useState(1);
	const limit = 10;

	const { data: agronomistsData, isPending } = useGetAgronomists(
		page,
		limit
	) as {
		data: AgronomistsResponse;
		isPending: boolean;
	};
	const { mutate: deleteAgronomist, isPending: isDeleting } =
		useDeleteAgronomistsMutation();

	const updateAgronomistDetails = (id: string) => {
		setIsOpen(true);
		setIsEditing(true);

		const selected =
			agronomistsData?.agronomists?.find(
				(agronomist: Agronomist) => agronomist._id === id
			) || null;
		setSelectedAgronomist(selected);
	};

	const onDeleteAgronomist = (id: string) => {
		deleteAgronomist(
			{ agronomistId: id },
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
					<h3 className="font-bold text-lg md:text-xl">Agronomists</h3>
					<span className="text-muted-foreground text-sm">
						Manage registered agronomists/inspectors and their information.
					</span>
				</div>

				<Button
					className="bg-green-500 text-white cursor-pointer flex items-center gap-2"
					onClick={() => {
						setIsEditing(false);
						setIsOpen(true);
						setSelectedAgronomist(null);
					}}
				>
					<PlusCircle />
					Add Agronomist
				</Button>

				<AddAgronomist
					key={selectedAgronomist?._id ?? "new"}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					isEditing={isEditing}
					data={selectedAgronomist}
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
							<TableCaption>List of all agronomists.</TableCaption>
							<TableHeader>
								<TableRow>
									{agronomistsTableHeads?.map((head) => (
										<TableHead
											key={head.value}
											className="table-head whitespace-nowrap"
										>
											{head.value}
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{agronomistsData?.agronomists?.map((agronomist) => (
									<TableRow key={agronomist._id}>
										<TableCell>{agronomist.fullname}</TableCell>
										<TableCell>{agronomist.email}</TableCell>
										<TableCell>{agronomist.phone}</TableCell>
										<TableCell>{agronomist.county}</TableCell>
										<TableCell>
											<span
												className={cn(
													statusColor(agronomist.status),
													"rounded-full px-2 py-1 text-xs font-semibold"
												)}
											>
												{agronomist.status}
											</span>
										</TableCell>
										<TableCell className="flex items-center gap-4">
											<Button
												size="sm"
												className="bg-transparent text-black modal-close-btn"
												onClick={() => updateAgronomistDetails(agronomist._id)}
											>
												<SquarePen />
											</Button>

											<Button
												size="sm"
												className="bg-transparent text-red-500 hover:bg-green-900/10"
												onClick={() => onDeleteAgronomist(agronomist._id)}
											>
												<Trash2 />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TableCell colSpan={agronomistsTableHeads.length}>
										<div className="flex justify-center">
											{agronomistsData?.pagination && (
												<Pagination
													currentPage={agronomistsData.pagination.page}
													totalPages={agronomistsData.pagination.totalPages}
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

export default Agronomists;
