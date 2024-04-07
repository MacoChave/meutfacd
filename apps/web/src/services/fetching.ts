import api from '@/api/server';
import { TypeWithKey } from '@/models/TypeWithKey';
import { setBearerToken } from '@/utils/bearer';

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
	setBearerToken();
	const response = await api.get<T>(path, {
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
	setBearerToken();
	const response = await api.post<T>(path, body, {
		responseType: responseType as any,
		headers: {
			...headers,
		},
		params,
	});
	console.log({ response });
	return response.data;
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
	setBearerToken();
	const response = await api.put<T>(path, body, {
		headers: {
			...headers,
		},
		params,
	});
	return response.data;
}

// DELETE DATA
export async function deleteData<T>({
	path,
	params = {},
	headers = {
		'Content-Type': 'application/json',
	},
}: axiosProps): Promise<T> {
	setBearerToken();
	const response = await api.delete<T>(path, {
		headers: {
			...headers,
		},
		params,
	});
	return response.data;
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
	setBearerToken();
	const response = await api<T>({
		method,
		url: path,
		data: body,
		headers: {
			...headers,
		},
		params,
	});
	return response.data;
}
