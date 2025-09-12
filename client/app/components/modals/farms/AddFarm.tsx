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
import { addFarmSchema, type AddFarmSchema } from "@/lib/schema";
import type { AddEntityModalProps } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const AddFarm = ({ isOpen, setIsOpen }: AddEntityModalProps) => {
	const form = useForm<AddFarmSchema>({
		resolver: zodResolver(addFarmSchema),
		defaultValues: {
			farmName: "",
			farmerId: "",
			location: "",
			area: 0,
			status: "pending review",
		},
	});

	const farmStatus = [
		{ label: "Active", value: "active" },
		{ label: "Pending Review", value: "pending review" },
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
					<DialogTitle>Add Farm</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						className="space-y-4"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<ShadFormField
							label="farm name"
							name="farmName"
							type="text"
							placeholder="enter farm name"
						/>

						<ShadFormField
							label="farmer ID"
							name="farmerId"
							type="text"
							placeholder="enter farmer ID"
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
							placeholder="kenya"
						/>

						<ShadFormField
							label="status"
							name="status"
							type="select"
							options={farmStatus}
							// description="Select the farmer's status"
							// placeholder="kenya"
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
								Add Farm
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddFarm;
