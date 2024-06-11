import api from '@/api/server';
import { TPagination, TResponse } from '@/models/Fetching';
import { setBearerToken } from '@/utils/bearer';
import {
	QueryFunctionContext,
	useInfiniteQuery,
	useQuery,
} from '@tanstack/react-query';

const fetchData = async ({ queryKey }: QueryFunctionContext) => {
	setBearerToken();
	let queryParams = '';
	if (queryKey[3] !== undefined) {
		queryParams = `?${Object.entries(queryKey[2] as Object)
			.map(([key, value]) => `${key}=${value}`)
			.join('&')}`;
	}
	const { data } = await api.get(queryKey[1] as string, {
		params: queryKey[2] as Object,
	});
	return data;
};

export const useFetch = ({
	name = 'data',
	url,
	params = {},
	query = undefined,
}: {
	name?: string;
	url: string;
	params?: Object;
	query?: Object;
}) => {
	return useQuery([name, url, params, query], fetchData, {});
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

const fetchInfinite = async ({
	queryKey,
	pageParam = 0,
}: QueryFunctionContext) => {
	setBearerToken();
	const { data } = await api.get(queryKey[1] as string, {
		params: {
			take: queryKey[2] as number,
			skip: pageParam ?? (queryKey[3] as number),
			q: queryKey[4] as string,
		},
	});
	return data;
};

export const useInfiniteFetch = ({
	name = 'data',
	url,
	take,
	skip,
	q,
}: {
	name?: string;
	url: string;
	take: number;
	skip: number;
	q: string;
}) => {
	return useInfiniteQuery<TResponse<TPagination>>(
		[name, url, take, skip, q],
		fetchInfinite,
		{
			getNextPageParam: (lastPage, allPages) => {
				return lastPage?.message?.nextCursor;
			},
		}
	);
};
