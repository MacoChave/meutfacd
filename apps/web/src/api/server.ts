import axios from 'axios';
import { BASE_URL } from '@/consts/Api';

const api = axios.create({
	// baseURL: BASE_URL,
});

export default api;
