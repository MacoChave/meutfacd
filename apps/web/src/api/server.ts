import axios from 'axios';
import { BASE_URL } from '@/consts/Api';

const api = axios.create({
	// baseURL: API_V1,
});

export default api;
