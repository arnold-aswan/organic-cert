import Loading from "@/components/shared/Loading";
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
import { useFarmOptions } from "@/hooks/useGetNamesById";
import {
	useCreateInspectionMutation,
	useGetComplianceQuestions,
	useUpdateInspectionMutation,
} from "@/hooks/useInspections";
import { inspectionSchema, type InspectionSchema } from "@/lib/schema";
import {
	buildDefaultCompliance,
	calculateComplianceScore,
	complianceColor,
	denormalizeCompliance,
	normalizeCompliance,
} from "@/lib/utils";
import type {
	AddEntityModalProps,
	ComplianceQuestionsResponse,
	Inspection,
} from "@/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const AddInspection = ({
	isOpen,
	setIsOpen,
	isEditing,
	data,
}: AddEntityModalProps<Inspection>) => {
	const { data: complianceQuiz, isPending } = useGetComplianceQuestions() as {
		data: ComplianceQuestionsResponse;
		isPending: boolean;
	};
	const { farms, isLoading } = useFarmOptions(1, 10);

	const { mutate: createInspection, isPending: isCreatingInspection } =
		useCreateInspectionMutation();
	const { mutate: updateInspection, isPending: isUpdating } =
		useUpdateInspectionMutation();

	const form = useForm<InspectionSchema>({
		resolver: zodResolver(inspectionSchema),
		defaultValues: {
			farmId: data?.farmId?.farmId ?? "",
			inspectionDate: data?.inspectionDate ?? "",
			inspectorName: data?.inspectorName ?? "",
			notes: data?.notes ?? "",
			status:
				data?.status === "Draft" ||
				data?.status === "Submitted" ||
				data?.status === "Approved" ||
				data?.status === "Rejected"
					? data.status
					: "Draft",
			compliance: {},
			// data?.compliance ?? buildDefaultCompliance(complianceQuiz || []),
		},
	});

	// useEffect(() => {
	// 	if (complianceQuiz && !isPending) {
	// 		form.reset({
	// 			...form.getValues(),
	// 			compliance:
	// 				isEditing && data?.compliance
	// 					? normalizeCompliance(data.compliance) // editing → use saved data
	// 					: buildDefaultCompliance(complianceQuiz), // new → all false
	// 		});
	// 	}
	// }, [complianceQuiz, isPending, data, isEditing]);

	useEffect(() => {
		if (complianceQuiz && !isPending) {
			form.reset({
				...form.getValues(),
				farmId: data?.farmId?.farmId ?? "", // since your backend sends farmId as object
				inspectionDate: data?.inspectionDate ?? "",
				inspectorName: data?.inspectorName ?? "",
				notes: data?.notes ?? "",
				status: data?.status ?? "Draft",
				compliance:
					isEditing && data?.compliance
						? normalizeCompliance(data.compliance) // ✅ normalize backend array
						: buildDefaultCompliance(complianceQuiz), // ✅ all false for new inspection
			});
		}
	}, [complianceQuiz, isPending, data, isEditing]);

	const complianceScore = calculateComplianceScore(
		form.watch("compliance"),
		complianceQuiz || []
	);

	const handleSaveDraft = (values: InspectionSchema) => {
		console.log("values", values);
		const isoDate = new Date(values.inspectionDate).toISOString();
		const payload = {
			...values,
			inspectionDate: isoDate,
			status: "Draft" as const,
		};
		if (isEditing && data?._id) {
			updateInspection({ inspectionId: data._id, inspectionData: payload });
		} else {
			createInspection({ inspectionData: payload });
		}
		form.reset();
		setIsOpen(false);
	};

	const onSubmit = (values: InspectionSchema) => {
		console.log("values submit", values);
		const isoDate = new Date(values.inspectionDate).toISOString();
		const payload = {
			...values,
			inspectionDate: isoDate,
			status: "Submitted" as const,
		};

		console.log("payload submit", payload);

		if (isEditing && data?._id) {
			updateInspection({ inspectionId: data._id, inspectionData: payload });
		} else {
			createInspection({ inspectionData: payload });
		}
		form.reset();
		setIsOpen(false);
	};

	console.log(complianceQuiz);

	if (isPending || isLoading) {
		return <div>Loading compliance questions…</div>;
	}

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
								type="select"
								placeholder="enter farm"
								options={farms}
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
							/>

							<div className="bg-gray-100 p-2 rounded-md">
								<h4 className="font-semibold">Compliance Checklist</h4>
								{complianceQuiz?.map((q) => (
									<FormField
										key={q.key}
										control={form.control}
										name={`compliance.${q.key}` as any}
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
														checked={field.value ?? false}
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
								name="notes"
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
								onClick={form.handleSubmit(handleSaveDraft)}
							>
								Save Draft
							</Button>
							<Button
								type="submit"
								className="bg-green-500 text-white"
								disabled={isCreatingInspection || isUpdating}
								// onClick={form.handleSubmit(onSubmit)}
							>
								{(isCreatingInspection || isUpdating) && <Loading />}
								{isEditing
									? isUpdating
										? "Saving..."
										: "Save Changes"
									: isCreatingInspection
										? "Submitting..."
										: "Submit Inspection"}
							</Button>
						</DialogFooter>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
};

export default AddInspection;
