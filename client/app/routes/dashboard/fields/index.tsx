import { Button } from "@/components/ui/button";
import {
	CircleDot,
	Leaf,
	PlusCircle,
	SquarePen,
	Trash2,
	Wheat,
	WheatOff,
} from "@/assets/icons";
import { useState } from "react";
import AddField from "@/components/modals/fields/AddField";
import type {
	FieldsResponse,
	Field,
	FieldsAnalyticsDataResponse,
} from "@/types/types";
import {
	useDeleteFieldMutation,
	useGetFields,
	useGetFieldsAnalytics,
} from "@/hooks/useFields";
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
import Loading from "@/components/shared/Loading";
import AnalyticsCard from "@/components/cards/shared/AnalyticsCard";

const Fields = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [selectedField, setSelectedField] = useState<Field | null>(null);
	const [page, setPage] = useState(1);
	const limit = 10;

	const { data: fieldsAnalyticsData, isPending: loadingAnalytics } =
		useGetFieldsAnalytics() as {
			data: FieldsAnalyticsDataResponse;
			isPending: boolean;
		};

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

			{loadingAnalytics ? (
				<div className="flex flex-col gap-2 items-center">
					<Loading />
					<p>Loading analytics data...</p>
				</div>
			) : (
				<div className="flex flex-col flex-wrap md:flex-row gap-4 md:gap-6 lg:gap-8">
					<AnalyticsCard
						value={fieldsAnalyticsData?.totalFields}
						title="total fields"
						icon={Wheat}
					/>

					<AnalyticsCard
						value={fieldsAnalyticsData?.growingFields}
						title="currently growing"
						icon={Leaf}
					/>

					<AnalyticsCard
						value={fieldsAnalyticsData?.harvestedFields}
						title="harvested"
						icon={WheatOff}
						iconColor={"text-yellow-400"}
					/>

					<AnalyticsCard
						value={fieldsAnalyticsData?.totalHectares}
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
