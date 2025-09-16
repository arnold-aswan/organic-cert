import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api-v1";

const api = axios.create({
	baseURL: BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

const postData = async <T>(url: string, data: unknown): Promise<T> => {
	const response = await api.post(url, data);

	return response.data;
};

const updateData = async <T>(url: string, data: unknown): Promise<T> => {
	const response = await api.put(url, data);

	return response.data;
};

const deleteData = async <T>(url: string): Promise<T> => {
	const response = await api.delete(url);

	return response.data;
};

const fetchData = async <T>(url: string): Promise<T> => {
	const response = await api.get(url);

	return response.data;
};

export { postData, fetchData, updateData, deleteData };
