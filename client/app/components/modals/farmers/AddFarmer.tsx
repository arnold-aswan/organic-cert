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
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import type { AddEntityModalProps } from "@/types/types";

const AddFarmer = ({ isOpen, setIsOpen }: AddEntityModalProps) => {
	const form = useForm<AddFarmerSchema>({
		resolver: zodResolver(addFarmerSchema),
		defaultValues: {
			fullname: "",
			email: "",
			phone: "",
			county: "",
			status: "active",
		},
	});

	const farmerStatus = [
		{ label: "Active", value: "active" },
		{ label: "Inactive", value: "inactive" },
	];

	const onSubmit = () => {};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogContent className="sm:max-w-[540px]">
				<DialogHeader>
					<DialogTitle>Add Farmer</DialogTitle>
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
							>
								Add Farmer
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddFarmer;
