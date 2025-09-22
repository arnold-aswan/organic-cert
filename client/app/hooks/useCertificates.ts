import { fetchData } from "@/lib/axios-utils";
import { useQuery } from "@tanstack/react-query";

export const useGetCertificates = (page: number, limit: number) => {
	return useQuery({
		queryKey: ["certificates", page, limit],
		queryFn: () => fetchData(`/certificates?page=${page}&limit=${limit}`),
		staleTime: 10 * 60 * 1000,
	});
};
