import { TypeWithKey } from '@/models/TypeWithKey';
import axios from 'axios';

type axiosProps = {
	path: string;
	method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
	body?: any;
	params?: TypeWithKey<any>;
	headers?: TypeWithKey<string>;
	responseType?: string;
};

// GET DATA
export async function getData<T>({
	path,
	params = {},
	headers = {
		'Content-Type': 'application/json',
	},
	responseType = 'json',
}: axiosProps): Promise<T> {
	const response = await axios.get(path, {
		headers: {
			...headers,
		},
		params,
		responseType: responseType as any,
	});
	console.log({ response });
	return response.data;
}

// POST DATA
export async function postData<T>({
	path,
	body = {},
	params = {},
	headers = {
		'Content-Type': 'application/json',
	},
	responseType = 'json',
}: axiosProps): Promise<T> {
	const { data } = await axios.post(path, body, {
		responseType: responseType as any,
		headers: {
			...headers,
		},
		params,
	});
	return data;
}

// PUT DATA
export async function putData<T>({
	path,
	body = {},
	params = {},
	headers = {
		'Content-Type': 'application/json',
	},
}: axiosProps): Promise<T> {
	const { data } = await axios.put(path, body, {
		headers: {
			...headers,
		},
		params,
	});
	return data;
}

// DELETE DATA
export async function deleteData<T>({
	path,
	params = {},
	headers = {
		'Content-Type': 'application/json',
	},
}: axiosProps): Promise<T> {
	const { data } = await axios.delete(path, {
		headers: {
			...headers,
		},
		params,
	});
	return data;
}

// GENERIC DATA
export async function genericData<T>({
	path,
	method = 'GET',
	body = {},
	params = {},
	headers = {
		'Content-Type': 'application/json',
	},
}: axiosProps): Promise<T> {
	const { data } = await axios({
		method,
		url: path,
		data: body,
		headers: {
			...headers,
		},
		params,
	});
	return data;
}
