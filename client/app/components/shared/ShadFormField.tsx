import { useFormContext } from "react-hook-form";
import {
	FormControl,
	FormItem,
	FormMessage,
	FormField,
	FormLabel,
	FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

type ShadFormFieldProps = {
	label: string;
	name: string;
	type: "text" | "email" | "textarea" | "select" | "tel" | "number" | "date";
	placeholder?: string;
	options?: { label: string; value: string }[];
	description?: string;
};

const ShadFormField = ({
	label,
	name,
	type,
	placeholder,
	options,
	description,
}: ShadFormFieldProps) => {
	const form = useFormContext();

	return (
		<FormField
			control={form.control}
			name={name}
			render={({ field }) => (
				<FormItem>
					<FormLabel className="capitalize">{label}</FormLabel>
					<FormControl>
						{type === "textarea" ? (
							<Textarea
								{...field}
								id={name}
								placeholder={placeholder}
								className="bg-gray-100 flex flex-col w-full min-h-28"
								rows={6}
							/>
						) : type === "select" ? (
							<Select
								onValueChange={field.onChange}
								value={field.value}
								defaultValue={field.value}
							>
								<SelectTrigger className="w-[180px]">
									<SelectValue placeholder={placeholder} />
								</SelectTrigger>
								<SelectContent>
									{options?.map((option) => (
										<SelectItem
											key={option.value}
											value={option.value}
										>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						) : type === "number" ? (
							<Input
								{...field}
								id={name}
								type={type}
								placeholder={placeholder}
								onChange={(e) => {
									// Convert string to number for number inputs
									const value = e.target.value;
									field.onChange(value === "" ? 0 : Number(value));
								}}
								value={field.value || ""}
							/>
						) : (
							<Input
								{...field}
								id={name}
								type={type}
								placeholder={placeholder}
							/>
						)}
					</FormControl>
					{description && <FormDescription>{description}</FormDescription>}
					<FormMessage />
				</FormItem>
			)}
		/>
	);
};

export default ShadFormField;
