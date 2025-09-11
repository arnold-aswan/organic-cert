import { Button } from "@/components/ui/button";
import { PlusCircle } from "@/assets/icons";

const Farmers = () => {
	return (
		<section className="space-y-6">
			<div className="flex items-center justify-between ">
				<div>
					<h3 className="font-bold text-lg md:text-xl">Farmers</h3>
					<span className="text-muted-foreground text-sm">
						Manage registered farmers and their information.
					</span>
				</div>

				<Button className="bg-green-500 text-white cursor-pointer">
					<PlusCircle />
					Add Farmer
				</Button>
			</div>
		</section>
	);
};

export default Farmers;
