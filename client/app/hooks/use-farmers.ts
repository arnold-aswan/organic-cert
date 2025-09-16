import { deleteData, fetchData, postData, updateData } from "@/lib/axios-utils";
import type { AddFarmerSchema } from "@/lib/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAddFarmersMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { farmerData: AddFarmerSchema }) =>
			postData("/farmers/create", data.farmerData),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["farmers"],
			});
		},
	});
};

export const useUpdateFarmersMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { farmerId: string; farmerData: AddFarmerSchema }) =>
			updateData(`/farmers/${data.farmerId}`, data.farmerData),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["farmers", data._id],
			});
		},
	});
};

export const useDeleteFarmersMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (data: { farmerId: string }) =>
			deleteData(`/farmers/${data.farmerId}`),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["farmers", data._id],
			});
		},
	});
};

export const useGetFarmers = (page: number, limit: number) => {
	return useQuery({
		queryKey: ["farmers", page, limit],
		queryFn: () => fetchData("/farmers"),
		staleTime: 10 * 60 * 1000,
	});
};
