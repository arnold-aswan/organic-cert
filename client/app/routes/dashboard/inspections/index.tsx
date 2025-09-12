import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "@/assets/icons";
import Inspection from "@/components/modals/inspections/Inspection";

const Inspections = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<section className="space-y-6">
			<div className="flex items-center justify-between ">
				<div>
					<h3 className="font-bold text-lg md:text-xl">Inspections</h3>
					<span className="text-muted-foreground text-sm">
						Create and manage farm inspections and compliance scores.
					</span>
				</div>

				<Button
					className="bg-green-500 text-white flex items-center gap-2"
					onClick={() => setIsOpen(true)}
				>
					<PlusCircle />
					New Inspection
				</Button>

				<Inspection
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				/>
			</div>
		</section>
	);
};

export default Inspections;
