import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { AuthState } from '../interfaces/AuthState';

type Estado = {
	estado: AuthState;
};

type Actions = {
	setEstado: (estado: AuthState) => void;
	resetEstado: () => void;
};

const initialState: Estado = {
	estado: {
		token: '',
		usuario: {
			nombre: '',
			correo: '',
			cui: '',
		},
	},
};

export const useAuthStore = create(
	persist<Estado & Actions>(
		(set) => ({
			...initialState,
			setEstado: (estado: AuthState) =>
				set({
					estado,
				}),
			resetEstado: () => set(initialState),
		}),
		{
			name: 'MEUT',
			storage: createJSONStorage(() => sessionStorage),
		}
	)
);
