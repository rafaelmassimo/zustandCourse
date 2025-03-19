import axios from 'axios';
import { useAuthStore } from '../stores';

const tesloApi = axios.create({
	baseURL: 'http://localhost:3000/api',
});

//>> Interceptor for checking login status
//The interceptor is going to the trigger during every single time the tesloapi is going to be used in other parts of the code
// for example on the auth.service.ts file where I'm using the get method
tesloApi.interceptors.request.use((config) => {

	const token = useAuthStore.getState().token;

	console.log('this is token',{token});

	if (token) {
		config.headers['Authorization'] = `Bearer ${token}`;
	}

	return config;
});

export { tesloApi };
