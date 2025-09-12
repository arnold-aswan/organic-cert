import { Button } from "@/components/ui/button";
import { PlusCircle } from "@/assets/icons";
import { useState } from "react";
import AddField from "@/components/modals/fields/AddField";

const Fields = () => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<section className="space-y-6">
			<div className="flex items-center justify-between ">
				<div>
					<h3 className="font-bold text-lg md:text-xl">Fields</h3>
					<span className="text-muted-foreground text-sm">
						Manage field information and crop details.
					</span>
				</div>

				<Button
					className="bg-green-500 text-white cursor-pointer flex items-center gap-2"
					onClick={() => setIsOpen(true)}
				>
					<PlusCircle />
					Add Field
				</Button>

				<AddField
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				/>
			</div>
		</section>
	);
};

export default Fields;
