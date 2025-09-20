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

const downloadFile = async (url: string, filename: string): Promise<void> => {
	const response = await api.get(url, {
		responseType: "blob", // Important: Set response type to blob for file downloads
	});

	// Create blob link to download
	const blob = new Blob([response.data], { type: "application/pdf" });
	const link = document.createElement("a");
	const objectUrl = URL.createObjectURL(blob);

	link.href = objectUrl;
	link.download = filename;
	document.body.appendChild(link);
	link.click();

	// Clean up
	document.body.removeChild(link);
	URL.revokeObjectURL(objectUrl);
};
export { postData, fetchData, updateData, deleteData, downloadFile };
