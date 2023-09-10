import { STORAGE_TYPES } from '@/models/Storage';

export const setStorage = (key: STORAGE_TYPES, value: any) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getStorage = (key: STORAGE_TYPES) => {
	return JSON.parse(localStorage.getItem(key) as string);
};
