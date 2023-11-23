import { TControl } from '@/models/Control';
import { configureStore } from '@reduxjs/toolkit';
import { controlSlice } from './states';

export interface AppStore {
	control: TControl;
}

export default configureStore<AppStore>({
	reducer: {
		control: controlSlice.reducer,
	},
});
