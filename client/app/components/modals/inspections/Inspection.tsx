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
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import {
	complianceQuestions,
	inspectionSchema,
	type InspectionSchema,
} from "@/lib/schema";
import { calculateComplianceScore, complianceColor } from "@/lib/utils";
import type { AddEntityModalProps } from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const Inspection = ({ isOpen, setIsOpen }: AddEntityModalProps) => {
	const form = useForm<InspectionSchema>({
		resolver: zodResolver(inspectionSchema),
		defaultValues: {
			farmId: "",
			inspectionDate: "",
			inspectorName: "",
			findings: "",
			status: "pending",
			compliance: {
				q1: false,
				q2: false,
				q3: false,
				q4: false,
				q5: false,
			},
		},
	});

	const fieldStatus = [
		{ label: "Planted", value: "planted" },
		{ label: "Growing", value: "growing" },
		{ label: "Harvested", value: "harvested" },
		{ label: "Fallow", value: "fallow" },
	];

	const complianceScore = calculateComplianceScore(form.watch("compliance"));

	const onSubmit = () => {};

	return (
		<Dialog
			open={isOpen}
			onOpenChange={setIsOpen}
		>
			<DialogContent className="sm:max-w-[550px] ">
				<DialogHeader>
					<DialogTitle>Add New Inspection</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						className="space-y-4"
						onSubmit={form.handleSubmit(onSubmit)}
					>
						<div className="w-full flex items-center gap-3">
							<ShadFormField
								label="farm ID"
								name="farmId"
								type="text"
								placeholder="enter farm"
							/>

							<ShadFormField
								label="Inspection date"
								name="inspectionDate"
								type="date"
								placeholder="enter inspection date"
							/>
						</div>

						<div className="space-y-4">
							<ShadFormField
								label="inspector"
								name="inspectorName"
								type="text"
								// placeholder="enter field crop"
							/>

							<div className="bg-gray-100 p-2 rounded-md">
								<h4 className="font-semibold">Compliance Checklist</h4>
								{complianceQuestions.map((q) => (
									<FormField
										key={q.key}
										control={form.control}
										name={`compliance.${q.key}`}
										render={({ field }) => (
											<FormItem className="flex items-center justify-between rounded-md p-3">
												<div>
													<FormLabel className="text-sm font-medium">
														{q.label}
													</FormLabel>
													<FormDescription className="text-xs text-muted-foreground">
														{q.description}
													</FormDescription>
												</div>
												<FormControl>
													<Switch
														checked={field.value}
														onCheckedChange={field.onChange}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								))}
								<hr />
								<div className="mt-4 text-sm font-medium">
									<p>
										Compliance Score:{" "}
										<span className={complianceColor(complianceScore)}>
											{complianceScore}%
										</span>
										{complianceScore >= 80 ? (
											<span className="ml-2 text-green-600">
												(Eligible for Certification)
											</span>
										) : (
											<span className="ml-2 text-red-600">(Not Eligible)</span>
										)}
									</p>
								</div>
							</div>

							<ShadFormField
								label="notes"
								name="findings"
								type="textarea"
								placeholder="Add inspection notes, observations or recommendations..."
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
								variant={"secondary"}
							>
								Save Draft
							</Button>
							<Button
								type="submit"
								className="bg-green-500 text-white"
							>
								Submit Inspection
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default Inspection;
