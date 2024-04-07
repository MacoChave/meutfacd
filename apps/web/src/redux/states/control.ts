import { TControl, controlDefault } from '@/models/Control';
import { STORAGE_TYPES } from '@/consts/Storage';
import { getStorage, setStorage } from '@/utils/storage';
import { createSlice } from '@reduxjs/toolkit';

export const controlSlice = createSlice({
	name: 'meut',
	initialState: getStorage(STORAGE_TYPES.CONTROL)
		? getStorage(STORAGE_TYPES.CONTROL)
		: controlDefault,
	reducers: {
		setLogged: (state: TControl, action) => {
			state = { ...state, auth: action.payload };
			setStorage(STORAGE_TYPES.CONTROL, state);
			return state;
		},
		setLoading: (state: TControl, action) => {
			state = { ...state, loading: action.payload };
			setStorage(STORAGE_TYPES.CONTROL, state);
			return state;
		},
		setLogout: (state: TControl) => {
			state = { ...controlDefault, loading: state.loading };
			setStorage(STORAGE_TYPES.CONTROL, state);
			return state;
		},
		reset: () => {
			return controlDefault;
		},
	},
});

export const { setLogged, setLoading, setLogout, reset } = controlSlice.actions;
