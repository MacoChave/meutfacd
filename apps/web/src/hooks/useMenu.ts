import { URL } from '@/consts/Api';
import { useFetch } from './useFetch';

const useMenu = () => {
	const {
		data: menu,
		isLoading,
		isError,
	} = useFetch({
		url: `${URL.PERMISSION}/all`,
	});

	return { menu, isLoading, isError };
};
