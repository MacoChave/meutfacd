import { useQuery } from '@tanstack/react-query';
import api from '../api/server';

const fetchData = async ({ queryKey }: any) => {
	return await api.get(queryKey[1], {
		params: {
			page: queryKey[2],
			limit: queryKey[3],
			search: queryKey[4],
			sort: queryKey[5],
			order: queryKey[6],
		},
	});
};

export const useFetchData = (
	url: string,
	page: number,
	limit: number,
	search: string,
	sort: string,
	order: string
) => {
	return useQuery(['data', url, page, limit, search, sort, order], fetchData);
};

export const useFetchDataWithoutQuery = (url: string) => {
	return useQuery(['data', url], fetchData);
};
