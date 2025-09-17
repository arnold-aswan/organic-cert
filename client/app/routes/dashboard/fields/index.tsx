import { Button } from "@/components/ui/button";
import { PlusCircle, SquarePen, Trash2 } from "@/assets/icons";
import { useState } from "react";
import AddField from "@/components/modals/fields/AddField";
import type { FieldsResponse, Field } from "@/types/types";
import { useDeleteFieldMutation, useGetFields } from "@/hooks/use-fields";
import { toast } from "sonner";
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
import { fieldsTableHeads } from "@/constants/data";

const Fields = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [selectedField, setSelectedField] = useState<Field | null>(null);
	const [page, setPage] = useState(1);
	const limit = 10;

	const { data: fieldsData, isPending } = useGetFields(page, limit) as {
		data: FieldsResponse;
		isPending: boolean;
	};

	const { mutate: deleteField, isPending: isDeleting } =
		useDeleteFieldMutation();

	const updateFieldDetails = (id: string) => {
		setIsOpen(true);
		setIsEditing(true);

		const selected =
			fieldsData?.fields?.find((field: Field) => field._id === id) || null;
		setSelectedField(selected);
	};

	const onDeleteField = (id: string) => {
		deleteField(
			{ fieldId: id },
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
					<h3 className="font-bold text-lg md:text-xl">Fields</h3>
					<span className="text-muted-foreground text-sm">
						Manage field information and crop details.
					</span>
				</div>

				<Button
					className="bg-green-500 text-white cursor-pointer flex items-center gap-2"
					onClick={() => setIsOpen(true)}
				>
					<PlusCircle />
					Add Field
				</Button>

				<AddField
					key={selectedField?._id ?? "new"}
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					isEditing={isEditing}
					data={selectedField}
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
							<TableCaption>List of all farms.</TableCaption>
							<TableHeader>
								<TableRow>
									{fieldsTableHeads?.map((data) => (
										<TableHead className="table-head whitespace-nowrap">
											{data.value}
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{fieldsData?.fields?.map((field) => (
									<TableRow key={field._id}>
										<TableCell>{field.name}</TableCell>
										<TableCell>{field.farmName}</TableCell>
										<TableCell>{field.crop}</TableCell>
										<TableCell>{field.area}</TableCell>
										<TableCell>{field.status}</TableCell>
										<TableCell className="flex items-center gap-4">
											<Button
												size="sm"
												className="bg-transparent text-black modal-close-btn"
												onClick={() => updateFieldDetails(field._id)}
											>
												<SquarePen />
											</Button>

											<Button
												size="sm"
												className="bg-transparent text-red-500 hover:bg-green-900/10"
												onClick={() => onDeleteField(field._id)}
											>
												<Trash2 />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TableCell colSpan={fieldsTableHeads.length}>
										<div className="flex justify-center">
											{fieldsData?.pagination && (
												<Pagination
													currentPage={fieldsData.pagination.page}
													totalPages={fieldsData.pagination.totalPages}
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

export default Fields;
