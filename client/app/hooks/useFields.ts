import { deleteData, fetchData, postData, updateData } from "@/lib/axios-utils";
import type { AddFieldSchema } from "@/lib/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useAddFieldMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { fieldData: AddFieldSchema }) =>
			postData("/fields/create", data.fieldData),
		onSuccess: (data: any) => {
			console.log(data);
			queryClient.invalidateQueries({
				queryKey: ["fields"],
				exact: false,
			});
		},
	});
};

export const useUpdateFieldMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { fieldId: string; fieldData: AddFieldSchema }) =>
			updateData(`/fields/${data.fieldId}`, data.fieldData),
		onSuccess: (data: any) => {
			console.log(data);
			queryClient.invalidateQueries({
				queryKey: ["fields"],
				exact: false,
			});
		},
	});
};

export const useDeleteFieldMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { fieldId: string }) =>
			deleteData(`/fields/${data.fieldId}`),
		onSuccess: (data: any) => {
			queryClient.invalidateQueries({
				queryKey: ["fields"],
				exact: false,
			});
		},
	});
};

export const useGetFields = (page: number, limit: number) => {
	return useQuery({
		queryKey: ["fields", page, limit],
		queryFn: () => fetchData(`/fields?page=${page}&limit=${limit}`),
		staleTime: 10 * 60 * 1000,
	});
};

export const useGetFieldsAnalytics = () => {
	return useQuery({
		queryKey: ["fields"],
		queryFn: () => fetchData("/fields/analytics"),
		staleTime: 10 * 60 * 1000,
	});
};
