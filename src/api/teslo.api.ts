import axios from 'axios';
import { useAuthStore } from '../stores';

const tesloApi = axios.create({
	baseURL: 'http://localhost:3000/api',
});

// Interceptor for checking login status
tesloApi.interceptors.request.use((config) => {
	const token = useAuthStore.getState().token;
	console.log('this is token',{token});

	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
});

export { tesloApi };
