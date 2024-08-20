import api from '@/api/server';
import { getStorage } from './storage';
import { STORAGE_TYPES } from '@/consts/Storage';

export const setBearerToken = () => {
	api.defaults.headers.common['authorization'] = `Bearer ${
		getStorage(STORAGE_TYPES.CONTROL)?.auth?.token ?? ''
	}`;
};

export const setVersion = () => {
	api.defaults.headers.common['version'] = `${
		getStorage(STORAGE_TYPES.CONTROL)?.auth?.version ?? ''
	}`;
};
