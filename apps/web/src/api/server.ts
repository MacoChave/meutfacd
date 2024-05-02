import axios from 'axios';
import { API_V1 } from '@/consts/Api';

const api = axios.create({
	// baseURL: API_V1,
});

export default api;
