import { addFarmerSchema, type AddFarmerSchema } from "@/lib/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ShadFormField from "@/components/shared/ShadFormField";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { AddEntityModalProps, Agronomist } from "@/types/types";
import { toast } from "sonner";
import Loading from "@/components/shared/Loading";
import {
	useAddAgronomistsMutation,
	useUpdateAgronomistsMutation,
} from "@/hooks/useAgronomists";

const AddAgronomist = ({
	isOpen,
	setIsOpen,
	isEditing,
	data,
}: AddEntityModalProps<Agronomist>) => {
	const form = useForm<AddFarmerSchema>({
		resolver: zodResolver(addFarmerSchema),
		defaultValues: {
			fullname: data?.fullname ?? "",
			email: data?.email ?? "",
			phone: data?.phone ?? "",
			county: data?.county ?? "",
			status:
				data?.status === "active" || data?.status === "inactive"
					? data.status
					: "active",
		},
	});

	const farmerStatus = [
		{ label: "Active", value: "active" },
		{ label: "Inactive", value: "inactive" },
	];

	const { mutate: addAgronomist, isPending } = useAddAgronomistsMutation();
	const { mutate: updateAgronomist, isPending: isUpdating } =
		useUpdateAgronomistsMutation();

	const onSubmit = (values: AddFarmerSchema) => {
		if (isEditing) {
			if (data?._id) {
				updateAgronomist(
					{ agronomistId: data._id, agronomistData: values },
					{
						onSuccess: (data: any) => {
							toast.success(data.message);
							form.reset();
							setIsOpen(false);
						},
						onError: (error: any) => {
							const errorMessage =
								error?.message ||
								error?.response?.data?.message ||
								"Uh Oh, something went wrong. Please try again later";
							toast.error(errorMessage);
						},
					}
				);
			} else {
				toast.error("Agronomist ID is missing.");
			}
		} else {
			addAgronomist(
				{ agronomistData: values },
				{
					onSuccess: (data: any) => {
						toast.success(data.message);
						form.reset();
						setIsOpen(false);
					},
					onError: (error: any) => {
						const errorMessage =
							error?.message ||
							error?.response?.data?.message ||
							"Uh Oh, something went wrong. Please try again later";
						toast.error(errorMessage);
					},
				}
			);
		}
	};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogContent className="sm:max-w-[540px] ">
				<DialogHeader>
					<DialogTitle>
						{isEditing ? "Edit Agronomist" : "Add Agronomist"}{" "}
					</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						className="space-y-4"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<ShadFormField
							label="full name"
							name="fullname"
							type="text"
							placeholder="john doe"
						/>

						<ShadFormField
							label="email"
							name="email"
							type="email"
							placeholder="john@gmail.com"
						/>

						<ShadFormField
							label="phone number"
							name="phone"
							type="tel"
							placeholder="+254712345678"
						/>

						<ShadFormField
							label="county"
							name="county"
							type="text"
							placeholder="kenya"
						/>

						<ShadFormField
							label="status"
							name="status"
							type="select"
							options={farmerStatus}
						/>

						<DialogFooter className="flex flex-row items-center justify-end gap-4 pt-4">
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
										: "Add Agronomist"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddAgronomist;
