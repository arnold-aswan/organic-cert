import Loading from "@/components/shared/Loading";
import ShadFormField from "@/components/shared/ShadFormField";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import {
	useAddFieldMutation,
	useUpdateFieldMutation,
} from "@/hooks/use-fields";
import { useFarmOptions } from "@/hooks/useGetNamesById";
import { addFieldSchema, type AddFieldSchema } from "@/lib/schema";
import type { AddEntityModalProps, Field } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const AddField = ({
	isOpen,
	setIsOpen,
	isEditing,
	data,
}: AddEntityModalProps<Field>) => {
	const form = useForm<AddFieldSchema>({
		resolver: zodResolver(addFieldSchema),
		defaultValues: {
			name: data?.name ?? "",
			farmId: data?.farmId ?? "",
			crop: data?.crop ?? "",
			area: data?.area ?? 0,
			status:
				data?.status === "planted" ||
				data?.status === "growing" ||
				data?.status === "harvested" ||
				data?.status === "fallow"
					? data.status
					: "planted",
		},
	});

	const fieldStatus = [
		{ label: "Planted", value: "planted" },
		{ label: "Growing", value: "growing" },
		{ label: "Harvested", value: "harvested" },
		{ label: "Fallow", value: "fallow" },
	];

	const { mutate: addField, isPending } = useAddFieldMutation();
	const { mutate: updateField, isPending: isUpdating } =
		useUpdateFieldMutation();

	const onSubmit = (values: AddFieldSchema) => {
		if (isEditing) {
			if (data?._id) {
				updateField(
					{ fieldId: data._id, fieldData: values },
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
				toast.error("Field ID is missing.");
			}
		} else {
			addField(
				{ fieldData: values },
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

	const { farms, isLoading } = useFarmOptions();

	if (isLoading) <div>Loading farms</div>;

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogContent className="sm:max-w-[550px] ">
				<DialogHeader>
					<DialogTitle>Add New Field</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						className="space-y-4"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<div className="space-y-4 flex flex-wrap gap-3">
							<ShadFormField
								label="field name"
								name="name"
								type="text"
								placeholder="enter field name"
							/>

							<ShadFormField
								label="farm ID"
								name="farmId"
								type="select"
								placeholder="select farm ID"
								options={farms}
							/>

							<ShadFormField
								label="crop"
								name="crop"
								type="text"
								placeholder="enter field crop"
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
								options={fieldStatus}
							/>
						</div>
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
										: "Add Field"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddField;
