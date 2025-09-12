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
	addFarmSchema,
	addFieldSchema,
	type AddFarmSchema,
	type AddFieldSchema,
} from "@/lib/schema";
import type { AddEntityModalProps } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const AddField = ({ isOpen, setIsOpen }: AddEntityModalProps) => {
	const form = useForm<AddFieldSchema>({
		resolver: zodResolver(addFieldSchema),
		defaultValues: {
			fieldName: "",
			farmId: "",
			crop: "",
			area: 0,
			status: "planted",
		},
	});

	const fieldStatus = [
		{ label: "Planted", value: "planted" },
		{ label: "Growing", value: "growing" },
		{ label: "Harvested", value: "harvested" },
		{ label: "Fallow", value: "fallow" },
	];

	const onSubmit = () => {};

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
								name="fieldName"
								type="text"
								placeholder="enter field name"
							/>

							<ShadFormField
								label="farm ID"
								name="farmId"
								type="text"
								placeholder="enter farm ID"
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
								placeholder="kenya"
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
							>
								Add Field
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddField;
