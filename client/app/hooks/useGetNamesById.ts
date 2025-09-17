import type { FarmersResponse, FarmsResponse } from "@/types/types";
import { useGetFarmers } from "./use-farmers";
import { useGetFarms } from "./use-farms";

export const useFarmerOptions = (page = 1, limit = 20) => {
	const { data, isPending } = useGetFarmers(page, limit) as {
		data: FarmersResponse;
		isPending: boolean;
	};

	const farmers =
		data?.farmers?.map((farmer) => ({
			label: farmer.fullname,
			value: farmer._id,
		})) || [];

	return { farmers, isLoading: isPending };
};

export const useFarmOptions = (page = 1, limit = 20) => {
	const { data, isPending } = useGetFarms(page, limit) as {
		data: FarmsResponse;
		isPending: boolean;
	};

	const farms =
		data?.farms?.map((farm) => ({
			label: farm.name,
			value: farm._id,
		})) || [];

	return { farms, isLoading: isPending };
};
