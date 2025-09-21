import { fetchData } from "@/lib/axios-utils";
import { useQuery } from "@tanstack/react-query";

export const useGetDashAnalytics = () => {
	return useQuery({
		queryKey: ["dashboard"],
		queryFn: () => fetchData("/dashboard/analytics"),
		staleTime: 10 * 6 * 1000,
	});
};

export const useGetDashActivities = () => {
	return useQuery({
		queryKey: ["dashboard activities"],
		queryFn: () => fetchData("/dashboard/activities"),
		staleTime: 10 * 6 * 1000,
	});
};
