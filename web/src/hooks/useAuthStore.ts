import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState } from '../interfaces/AuthState';

type Estado = {
	estado: AuthState;
};

type Actions = {
	setEstado: (estado: AuthState) => void;
	resetEstado: () => void;
};

export const useAuthStore = create(
	persist<Estado & Actions>(
		(set) => ({
			estado: {
				token: '',
				usuario: {
					nombre: '',
					correo: '',
					cui: '',
				},
			},
			setEstado: (estado: AuthState) =>
				set({
					estado,
				}),
			resetEstado: () =>
				set({
					estado: {
						token: '',
						usuario: {
							nombre: '',
							correo: '',
							cui: '',
						},
					},
				}),
		}),
		{ name: 'MEUT' }
	)
);
