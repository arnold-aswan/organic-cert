import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

type PaginationProps = {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};

const Pagination = ({
	currentPage,
	totalPages,
	onPageChange,
}: PaginationProps) => {
	// helper to generate page numbers with ellipsis
	const getPageNumbers = () => {
		const pages: (number | "ellipsis")[] = [];

		if (totalPages <= 5) {
			// if few pages, show all
			for (let i = 1; i <= totalPages; i++) pages.push(i);
		} else {
			pages.push(1);

			if (currentPage > 3) pages.push("ellipsis");

			const start = Math.max(2, currentPage - 1);
			const end = Math.min(totalPages - 1, currentPage + 1);

			for (let i = start; i <= end; i++) pages.push(i);

			if (currentPage < totalPages - 2) pages.push("ellipsis");

			pages.push(totalPages);
		}

		return pages;
	};

	const pages = getPageNumbers();

	return (
		<div className="flex items-center justify-center gap-2 mt-4">
			{/* Prev */}
			<button
				onClick={() => onPageChange(currentPage - 1)}
				disabled={currentPage === 1}
				className="p-2 rounded-lg border hover:bg-muted disabled:opacity-50"
			>
				<ChevronLeft className="w-4 h-4" />
			</button>

			{/* Page numbers */}
			{pages.map((p, idx) =>
				p === "ellipsis" ? (
					<span
						key={idx}
						className="px-3 py-1 text-gray-500"
					>
						<MoreHorizontal className="w-4 h-4" />
					</span>
				) : (
					<button
						key={p}
						onClick={() => onPageChange(p)}
						className={`px-3 py-1 rounded-lg border ${
							p === currentPage ? "bg-green-500 text-white" : "hover:bg-muted"
						}`}
					>
						{p}
					</button>
				)
			)}

			{/* Next */}
			<button
				onClick={() => onPageChange(currentPage + 1)}
				disabled={currentPage === totalPages}
				className="p-2 rounded-lg border hover:bg-muted disabled:opacity-50"
			>
				<ChevronRight className="w-4 h-4" />
			</button>
		</div>
	);
};

export default Pagination;
