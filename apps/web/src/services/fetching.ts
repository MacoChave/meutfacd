import axios from 'axios';

type postProps = {
	path: string;
	body: any;
	Authorization?: string;
	Params?: string;
};

// GET DATA
export async function getData<T>({
	path,
	Authorization,
	Params,
}: postProps): Promise<T> {
	const { data } = await axios.get(path, {
		headers: {
			'Content-Type': 'application/json',
			Authorization,
			Params,
		},
	});
	return data;
}

// POST DATA
export async function postData<T>({
	path,
	body,
	Authorization,
	Params,
}: postProps): Promise<T> {
	const { data } = await axios.post(path, body, {
		headers: {
			Authorization,
			Params,
		},
	});
	return data;
}

// PUT DATA
export async function putData<T>({
	path,
	body,
	Authorization,
	Params,
}: postProps): Promise<T> {
	const { data } = await axios.put(path, body, {
		headers: {
			Authorization,
			Params,
		},
	});
	return data;
}

// DELETE DATA
export async function deleteData<T>({
	path,
	Authorization,
	Params,
}: postProps): Promise<T> {
	const { data } = await axios.delete(path, {
		headers: {
			Authorization,
			Params,
		},
	});
	return data;
}
