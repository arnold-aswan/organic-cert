import { Button } from "@/components/ui/button";
import { PlusCircle, SquarePen, Trash2 } from "@/assets/icons";
import AddFarmer from "@/components/modals/farmers/AddFarmer";
import { useState } from "react";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { farmers } from "@/constants/data";
import { cn, statusColor } from "@/lib/utils";

const Farmers = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const updateFarmerDetails = () => {
		setIsOpen(true);
		setIsEditing(true);
	};

	return (
		<section className="space-y-6">
			<div className="flex flex-col items-start gap-3 xl:flex-row xl:items-center xl:justify-between ">
				<div>
					<h3 className="font-bold text-lg md:text-xl">Farmers</h3>
					<span className="text-muted-foreground text-sm">
						Manage registered farmers and their information.
					</span>
				</div>

				<Button
					className="bg-green-500 text-white cursor-pointer flex items-center gap-2"
					onClick={() => setIsOpen(true)}
				>
					<PlusCircle />
					Add Farmer
				</Button>

				<AddFarmer
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					isEditing={isEditing}
				/>
			</div>

			<div className="w-full max-w-full overflow-hidden">
				<div
					className="overflow-x-auto border rounded-lg"
					style={{
						WebkitOverflowScrolling: "touch",
						overscrollBehaviorX: "contain",
						maxWidth: "calc(100vw - 2rem)",
					}}
				>
					<div className="min-w-full">
						<Table className="w-full  border-collapse">
							<TableCaption>List of all farmers.</TableCaption>
							<TableHeader>
								<TableRow>
									<TableHead className="table-head whitespace-nowrap">
										Full Name
									</TableHead>
									<TableHead className="table-head whitespace-nowrap">
										Email
									</TableHead>
									<TableHead className="table-head whitespace-nowrap">
										Phone
									</TableHead>
									<TableHead className="table-head whitespace-nowrap">
										County
									</TableHead>
									<TableHead className="table-head whitespace-nowrap">
										Status
									</TableHead>
									<TableHead className="table-head whitespace-nowrap">
										Actions
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{farmers.map((entry) => (
									<TableRow key={entry.id}>
										<TableCell>{entry.fullname}</TableCell>
										<TableCell>{entry.email}</TableCell>
										<TableCell>{entry.phone}</TableCell>
										<TableCell>{entry.county}</TableCell>
										<TableCell>
											<span
												className={cn(
													statusColor(entry.status),
													"rounded-full px-2 py-1 text-xs font-semibold"
												)}
											>
												{entry.status}
											</span>
										</TableCell>
										<TableCell className="flex items-center gap-4">
											<Button
												size="sm"
												className="bg-transparent text-black modal-close-btn"
												onClick={updateFarmerDetails}
											>
												<SquarePen />
											</Button>

											<Button
												size="sm"
												className="bg-transparent text-red-500 hover:bg-green-900/10"
												onClick={updateFarmerDetails}
											>
												<Trash2 />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Farmers;
