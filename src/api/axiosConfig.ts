import axios from "axios";

const apiClient = axios.create({
	baseURL: import.meta.env.VITE_USE_LOCAL_BACKEND ? "http://localhost:8080/api/v1/" : import.meta.env.VITE_BACKEND_URL,
});

export default apiClient;
