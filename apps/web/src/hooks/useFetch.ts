import api from '@/api/server';
import { setBearerToken } from '@/utils/bearer';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';

const fetchData = async ({ queryKey }: QueryFunctionContext) => {
	setBearerToken();
	const { data } = await api.get(queryKey[1] as string, {
		params: queryKey[2] as Object,
	});
	return data;
};

const fetchCustomData = async ({ queryKey }: QueryFunctionContext) => {
	setBearerToken();
	const { data } = await api({
		url: queryKey[1] as string,
		method: queryKey[2] as string,
		data: queryKey[3] as Object,
		params: queryKey[4] as Object,
	});
	return data;
};

const fetchDataPaginado = async ({ queryKey }: QueryFunctionContext) => {
	setBearerToken();
	const { data } = await api.get(queryKey[1] as string, {
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
	return useQuery(['data', url, params], fetchData, {});
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
