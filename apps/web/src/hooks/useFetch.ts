import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async ({ queryKey }: QueryFunctionContext) => {
	const { data } = await axios.get(queryKey[1] as string, {
		params: queryKey[3] as Object,
	});
	return data;
};

const fetchCustomData = async ({ queryKey }: QueryFunctionContext) => {
	const { data } = await axios({
		url: queryKey[1] as string,
		method: queryKey[2] as string,
		data: queryKey[3] as Object,
		params: queryKey[4] as Object,
	});
	return data;
};

const fetchDataPaginado = async ({ queryKey }: QueryFunctionContext) => {
	const { data } = await axios.get(queryKey[1] as string, {
		params: {
			page: queryKey[3] as number,
			limit: queryKey[4] as number,
			search: queryKey[5] as string,
			sort: queryKey[6] as string,
			order: queryKey[7] as string,
		},
		headers: {
			authorization: `Bearer ${queryKey[2]}`,
		},
	});
	return data;
};

export const useFetch = ({
	url,
	params = {},
}: {
	url: string;
	params?: Object;
}) => {
	return useQuery(['data', url, params], fetchData);
};

export const useCustomFetch = ({
	url,
	method = 'post',
	body = {},
	params = {},
}: {
	url: string;
	method?: 'get' | 'post';
	body?: Object;
	params?: Object;
}) => {
	return useQuery(['data', url, method, body, params], fetchCustomData);
};

export const useFetchPaginado = ({
	url,
	token,
	page,
	limit,
	sort,
	order,
	search,
}: {
	url: string;
	token: string;
	page: number;
	limit: number;
	sort: string;
	order: string;
	search: string;
}) => {
	return useQuery(
		['data', url, token, page, limit, sort, order, search],
		fetchDataPaginado
	);
};
