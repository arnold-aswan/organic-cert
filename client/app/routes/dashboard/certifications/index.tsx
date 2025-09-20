import {
	// useDownloadCertificate,
	useGetCertificates,
} from "@/hooks/useCertificates";
import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { certificatesTableHeads } from "@/constants/data";
import { Button } from "@/components/ui/button";
import { Download } from "@/assets/icons";
import type { CertificatesResponse } from "@/types/types";
import { certificateStatus, cn, complianceColor } from "@/lib/utils";
import Pagination from "@/components/shared/Pagination";
import { format } from "date-fns";
import { downloadFile } from "@/lib/axios-utils";
import { toast } from "sonner";

const Certifications = () => {
	const [page, setPage] = useState(1);
	const [isDownloading, setIsDownloading] = useState(false);
	const limit = 10;

	const { data: certificatesData, isPending } = useGetCertificates(
		page,
		limit
	) as {
		data: CertificatesResponse;
		isPending: boolean;
	};

	const handleDownloadCertificate = async (
		certificateId: string,
		certificateNo: string
	) => {
		try {
			setIsDownloading(true);
			await downloadFile(
				`/certificates/${certificateId}/download`,
				`${certificateNo}.pdf`
			);
			toast.success("Certificate downloaded successfully");
		} catch (error) {
			toast.error("Error downloading certificate");
		} finally {
			setIsDownloading(false);
		}
	};

	if (isPending) return <div>Loading...</div>;
	return (
		<section className="space-y-6">
			<div>
				<div>
					<h3 className="font-bold text-lg md:text-xl">Certifications</h3>
					<span className="text-muted-foreground text-sm">
						View and manage organic certification certificates.
					</span>
				</div>
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
							<TableCaption>List of all farms.</TableCaption>
							<TableHeader>
								<TableRow>
									{certificatesTableHeads?.map((data) => (
										<TableHead className="table-head whitespace-nowrap">
											{data.value}
										</TableHead>
									))}
								</TableRow>
							</TableHeader>
							<TableBody>
								{certificatesData?.certificates?.map((data) => (
									<TableRow key={data._id}>
										<TableCell>{data.certificateNo}</TableCell>
										<TableCell>{data.farmName}</TableCell>
										<TableCell>{data.farmerName}</TableCell>
										<TableCell>{format(data.issueDate, "P")}</TableCell>
										<TableCell>{format(data.expiryDate, "P")}</TableCell>
										<TableCell
											className={cn(
												complianceColor(data.complianceScore),
												"text-center"
											)}
										>
											{data.complianceScore}%
										</TableCell>
										<TableCell>{certificateStatus(data.expiryDate)}</TableCell>
										<TableCell className="flex items-center gap-4">
											<Button
												size="sm"
												className="bg-transparent text-black modal-close-btn"
												onClick={() =>
													handleDownloadCertificate(
														data._id,
														data.certificateNo
													)
												}
												disabled={isDownloading}
											>
												<Download />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
							<TableFooter>
								<TableRow>
									<TableCell colSpan={certificatesTableHeads.length}>
										<div className="flex justify-center">
											{certificatesData?.pagination && (
												<Pagination
													currentPage={certificatesData.pagination.page}
													totalPages={certificatesData.pagination.totalPages}
													onPageChange={(newPage) => setPage(newPage)}
												/>
											)}
										</div>
									</TableCell>
								</TableRow>
							</TableFooter>
						</Table>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Certifications;
