import { Control, initialControl } from '@/models/Control';
import { STORAGE_TYPES } from '@/models/Storage';
import { getStorage, setStorage } from '@/utils/storage';
import { createSlice } from '@reduxjs/toolkit';

export const controlSlice = createSlice({
	name: 'control',
	initialState: getStorage(STORAGE_TYPES.CONTROL)
		? getStorage(STORAGE_TYPES.CONTROL)
		: initialControl,
	reducers: {
		setLogged: (state: Control, action) => {
			state = { ...state, auth: action.payload };
			setStorage(STORAGE_TYPES.CONTROL, state);
			return state;
		},
		setLoading: (state: Control, action) => {
			state = { ...state, loading: action.payload };
			setStorage(STORAGE_TYPES.CONTROL, state);
			return state;
		},
		setLogout: (state: Control) => {
			state = { ...initialControl, loading: state.loading };
			setStorage(STORAGE_TYPES.CONTROL, state);
			return state;
		},
		reset: () => {
			return initialControl;
		},
	},
});

export const { setLogged, setLoading, setLogout, reset } = controlSlice.actions;
