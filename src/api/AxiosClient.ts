import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
	baseURL: import.meta.env.VITE_API_URL,
	headers: {
		"Content-Type": "application/json",
	},
	paramsSerializer: (params) =>
		queryString.stringify(params, { arrayFormat: "bracket" }),
});

axiosClient.interceptors.request.use(async (config) => {
	// handle token
	const token = localStorage.getItem("access_token");
	if (token) {
		config.headers.authorization = token;
	}
	return config;
});

axiosClient.interceptors.response.use(
	(response) => {
		return response.data;
	},
	(error) => {
		throw error;
	}
);

export default axiosClient;
