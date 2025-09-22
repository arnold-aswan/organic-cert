import { fetchData, postData, updateData } from "@/lib/axios-utils";
import type { InspectionSchema } from "@/lib/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateInspectionMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { inspectionData: InspectionSchema }) =>
			postData("/inspections/create", data.inspectionData),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["inspections"],
				exact: false,
			});
		},
	});
};

export const useUpdateInspectionMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: {
			inspectionId: string;
			inspectionData: InspectionSchema;
		}) => updateData(`/inspections/${data.inspectionId}`, data.inspectionData),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["inspections"],
				exact: false,
			});
		},
	});
};

export const useGetInspections = (page: number, limit: number) => {
	return useQuery({
		queryKey: ["inspections", page, limit],
		queryFn: () => fetchData(`/inspections?page=${page}&limit=${limit}`),
		staleTime: 10 * 60 * 1000,
	});
};

export const useGetComplianceQuestions = () => {
	return useQuery({
		queryKey: ["compliance"],
		queryFn: () => fetchData(`/compliance-questions`),
		staleTime: 10 * 60 * 1000,
	});
};

export const useGetInspectionsAnalytics = () => {
	return useQuery({
		queryKey: ["inspections"],
		queryFn: () => fetchData("/inspections/analytics"),
		staleTime: 10 * 60 * 1000,
	});
};
