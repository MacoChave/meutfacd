import { Control } from '@/models/Control';
import { configureStore } from '@reduxjs/toolkit';
import { controlSlice } from './states';

export interface AppStore {
	control: Control;
}

export default configureStore<AppStore>({
	reducer: {
		control: controlSlice.reducer,
	},
});
