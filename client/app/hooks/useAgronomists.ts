import { deleteData, fetchData, postData, updateData } from "@/lib/axios-utils";
import type { AddFarmerSchema } from "@/lib/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAddAgronomistsMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { agronomistData: AddFarmerSchema }) =>
			postData("/agronomists/create", data.agronomistData),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["agronomists"],
				exact: false,
			});
		},
	});
};

export const useUpdateAgronomistsMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: {
			agronomistId: string;
			agronomistData: AddFarmerSchema;
		}) => updateData(`/agronomists/${data.agronomistId}`, data.agronomistData),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["agronomists"],
				exact: false,
			});
		},
	});
};

export const useDeleteAgronomistsMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { agronomistId: string }) =>
			deleteData(`/agronomists/${data.agronomistId}`),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["agronomists"],
				exact: false,
			});
		},
	});
};

export const useGetAgronomists = (page: number, limit: number) => {
	return useQuery({
		queryKey: ["agronomists", page, limit],
		queryFn: () => fetchData(`/agronomists?page=${page}&limit=${limit}`),
		staleTime: 10 * 60 * 1000,
	});
};
