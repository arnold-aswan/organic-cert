import type {
	AgronomistsResponse,
	FarmersResponse,
	FarmsResponse,
} from "@/types/types";
import { useGetFarmers } from "./useFarmers";
import { useGetFarms } from "./useFarms";
import { useGetAgronomists } from "./useAgronomists";

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

export const useAgronomistOptions = (page = 1, limit = 20) => {
	const { data, isPending } = useGetAgronomists(page, limit) as {
		data: AgronomistsResponse;
		isPending: boolean;
	};

	const agronomists =
		data?.agronomists?.map((agronomist) => ({
			label: agronomist.fullname,
			value: agronomist.fullname,
		})) || [];

	return { agronomists, isLoading: isPending };
};
