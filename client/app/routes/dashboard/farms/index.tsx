import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "@/assets/icons";
import AddFarmer from "@/components/modals/farmers/AddFarmer";
import AddFarm from "@/components/modals/farms/AddFarm";

const Farms = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<section className="space-y-6">
			<div className="flex items-center justify-between ">
				<div>
					<h3 className="font-bold text-lg md:text-xl">Farms</h3>
					<span className="text-muted-foreground text-sm">
						Manage farms and their operational details.
					</span>
				</div>

				<Button
					className="bg-green-500 text-white cursor-pointer flex items-center gap-2"
					onClick={() => setIsOpen(true)}
				>
					<PlusCircle />
					Add Farm
				</Button>

				<AddFarm
					isOpen={isOpen}
					setIsOpen={setIsOpen}
				/>
			</div>
		</section>
	);
};

export default Farms;
