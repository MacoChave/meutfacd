import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchData = async ({ queryKey }: QueryFunctionContext) => {
	const { data } = await axios.get(queryKey[1] as string, {
		params: queryKey[3] as Object,
		headers: {
			authorization: `Bearer ${queryKey[2]}`,
		},
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
	token,
	params,
}: {
	url: string;
	token: string;
	params?: Object;
}) => {
	return useQuery(['data', url, token, params || {}], fetchData);
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
