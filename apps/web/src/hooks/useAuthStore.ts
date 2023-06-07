import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthState } from '../interfaces/AuthState';

type Actions = {
	setEstado: (estado: AuthState) => void;
	resetEstado: () => void;
};

const initialState: AuthState = {
	token: '',
	name: '',
	rol: '',
	paginas: [],
};

export const useAuthStore = create(
	persist<AuthState & Actions>(
		(set) => ({
			...initialState,
			setEstado: (estado: AuthState) => set(estado),
			resetEstado: () => set(initialState),
		}),
		{
			name: 'MEUT',
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
