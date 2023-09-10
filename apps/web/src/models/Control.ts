export interface Permission {
	code: number;
	name: number;
	description: string;
	menu: string;
}

export type AuthState = {
	token: string;
	name: string;
	rol: string;
	permissions: Permission[];
};

export type Control = {
	loading: boolean;
	auth: AuthState;
};

export const initialControl: Control = {
	loading: false,
	auth: {
		token: '',
		name: '',
		rol: '',
		permissions: [],
	},
};
