import ShadFormField from "@/components/shared/ShadFormField";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { addFarmSchema, type AddFarmSchema } from "@/lib/schema";
import type { AddEntityModalProps, Farm, FarmersResponse } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Loading from "@/components/shared/Loading";
import { useAddFarmMutation, useUpdateFarmMutation } from "@/hooks/useFarms";
import { toast } from "sonner";
import { useGetFarmers } from "@/hooks/useFarmers";

const AddFarm = ({
	isOpen,
	setIsOpen,
	isEditing,
	data,
}: AddEntityModalProps<Farm>) => {
	const form = useForm<AddFarmSchema>({
		resolver: zodResolver(addFarmSchema),
		defaultValues: {
			name: data?.name ?? "",
			farmerId: data?.farmerId?._id ?? "",
			location: data?.location ?? "",
			area: data?.area ?? 0,
			status:
				data?.status === "active" ||
				data?.status === "inactive" ||
				data?.status === "pending review"
					? data.status
					: "pending review",
		},
	});

	const farmStatus = [
		{ label: "Active", value: "active" },
		{ label: "Pending Review", value: "pending review" },
		{ label: "Inactive", value: "inactive" },
	];

	const { data: farmersData, isPending: isLoading } = useGetFarmers(1, 20) as {
		data: FarmersResponse;
		isPending: boolean;
	};
	const { mutate: addFarm, isPending } = useAddFarmMutation();
	const { mutate: updateFarm, isPending: isUpdating } = useUpdateFarmMutation();

	const onSubmit = (values: AddFarmSchema) => {
		if (isEditing) {
			if (data?._id) {
				updateFarm(
					{ farmId: data._id, farmData: values },
					{
						onSuccess: (data: any) => {
							toast.success(data.message);
							form.reset();
							setIsOpen(false);
						},
						onError: (error: any) => {
							const errorMessage = error.response.data.message;
							toast.error(errorMessage);
						},
					}
				);
			} else {
				toast.error("Farm ID is missing.");
			}
		} else {
			addFarm(
				{ farmData: values },
				{
					onSuccess: (data: any) => {
						toast.success(data.message);
						form.reset();
						setIsOpen(false);
					},
					onError: (error: any) => {
						const errorMessage = error.response.data.message;
						toast.error(errorMessage);
					},
				}
			);
		}
	};

	const farmers =
		farmersData?.farmers?.map((farmer) => ({
			label: farmer.fullname,
			value: farmer._id,
		})) || [];

	if (isLoading) <div>Loading farmers</div>;

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogContent className="sm:max-w-[540px]">
				<DialogHeader>
					<DialogTitle>Add Farm</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						className="space-y-4"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<ShadFormField
							label="farm name"
							name="name"
							type="text"
							placeholder="enter farm name"
						/>
						<ShadFormField
							label="farmer ID"
							name="farmerId"
							type="select"
							placeholder="select farmer ID"
							options={farmers}
						/>

						<ShadFormField
							label="location"
							name="location"
							type="text"
							placeholder="enter farm location"
						/>
						<ShadFormField
							label="area (Ha)"
							name="area"
							type="number"
							placeholder="1"
						/>

						<ShadFormField
							label="status"
							name="status"
							type="select"
							options={farmStatus}
						/>
						<DialogFooter className="flex items-center justify-end gap-4 pt-4">
							<DialogClose asChild>
								<Button
									variant={"outline"}
									className="modal-close-btn "
								>
									Cancel
								</Button>
							</DialogClose>
							<Button
								type="submit"
								className="bg-green-500 text-white"
								disabled={isUpdating || isPending}
							>
								{(isUpdating || isPending) && <Loading />}
								{isEditing
									? isUpdating
										? "Saving..."
										: "Save Changes"
									: isPending
										? "Adding..."
										: "Add Farm"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddFarm;
