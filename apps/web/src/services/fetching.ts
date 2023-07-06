import { TypeWithKey } from '@/models/TypeWithKey';
import axios from 'axios';

type axiosProps = {
	path: string;
	body?: any;
	params?: TypeWithKey<string>;
	headers?: TypeWithKey<string>;
};

// GET DATA
export async function getData<T>({
	path,
	params = {},
}: axiosProps): Promise<T> {
	const { data } = await axios.get(path, {
		headers: {
			'Content-Type': 'application/json',
		},
		params,
	});
	return data;
}

// POST DATA
export async function postData<T>({
	path,
	body = {},
	params = {},
	headers = {
		'Content-Type': 'application/json',
	},
}: axiosProps): Promise<T> {
	console.log('headers', headers);
	const { data } = await axios.post(path, body, {
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
}: axiosProps): Promise<T> {
	const { data } = await axios.put(path, body, {
		params,
	});
	return data;
}

// DELETE DATA
export async function deleteData<T>({
	path,
	params = {},
}: axiosProps): Promise<T> {
	const { data } = await axios.delete(path, {
		params,
	});
	return data;
}
