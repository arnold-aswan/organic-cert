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
import type { AddEntityModalProps, Farmer } from "@/types/types";
import {
	useAddFarmersMutation,
	useUpdateFarmersMutation,
} from "@/hooks/use-farmers";
import { toast } from "sonner";
import Loading from "@/components/shared/Loading";

const AddFarmer = ({
	isOpen,
	setIsOpen,
	isEditing,
	data,
}: AddEntityModalProps<Farmer>) => {
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

	const { mutate: addFarmer, isPending } = useAddFarmersMutation();
	const { mutate: updateFarmer, isPending: isUpdating } =
		useUpdateFarmersMutation();

	const onSubmit = (values: AddFarmerSchema) => {
		if (isEditing) {
			if (data?._id) {
				updateFarmer(
					{ farmerId: data._id, farmerData: values },
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
				toast.error("Farmer ID is missing.");
			}
		} else {
			addFarmer(
				{ farmerData: values },
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

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogContent className="sm:max-w-[540px]">
				<DialogHeader>
					<DialogTitle>{isEditing ? "Edit Farmer" : "Add Farmer"} </DialogTitle>
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
										: "Add Farmer"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddFarmer;
