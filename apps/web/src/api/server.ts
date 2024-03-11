import axios from 'axios';
import { API_V1 } from '@/consts/Api';

const api = axios.create({
	// baseURL: API_V1,
	headers: {
		Authorization: `Bearer ${
			JSON.parse(localStorage.getItem('user') || '{}')?.state?.token ?? ''
		}`,
	},
});

export default api;
