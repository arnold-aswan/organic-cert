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
	type: string;
	placeholder?: string;
	options?: any;
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
					<FormLabel>{label}</FormLabel>
					<FormControl>
						{type === "textarea" ? (
							<Textarea
								{...field}
								id={name}
								placeholder={placeholder}
								rows={5}
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
									{options?.map((option: string) => (
										<SelectItem
											key={option}
											value={option}
										>
											{option}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
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
