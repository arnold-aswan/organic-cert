import { deleteData, fetchData, postData, updateData } from "@/lib/axios-utils";
import type { AddFarmSchema } from "@/lib/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAddFarmMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { farmData: AddFarmSchema }) =>
			postData("/farms/create", data.farmData),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["farms"],
				exact: false,
			});
		},
	});
};

export const useUpdateFarmMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { farmId: string; farmData: AddFarmSchema }) =>
			updateData(`/farms/${data.farmId}`, data.farmData),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["farms"],
				exact: false,
			});
		},
	});
};

export const useDeleteFarmMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { farmId: string }) =>
			deleteData(`/farms/${data.farmId}`),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["farms"],
				exact: false,
			});
		},
	});
};

export const useGetFarms = (page: number, limit: number) => {
	return useQuery({
		queryKey: ["farms", page, limit],
		queryFn: () => fetchData(`/farms?page=${page}&limit=${limit}`),
		staleTime: 10 * 6 * 1000,
	});
};
