import { AuthState } from '../interfaces/AuthState';

export type AuthAction =
	| { type: 'LOGIN'; payload: { carnet: string } }
	| { type: 'LOGIN_SUCCESS'; payload: { token: string } }
	| { type: 'LOGIN_FAILURE'; payload: { error: string } }
	| { type: 'LOGOUT' }
	| { type: 'REGISTER'; payload: { carnet: string } }
	| { type: 'REGISTER_SUCCESS' }
	| { type: 'REGISTER_FAILURE'; payload: { error: string } }
	| { type: 'CLEAR_ERROR' };

export const authReducer = (
	state: AuthState,
	action: AuthAction
): AuthState => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				loading: true,
			};
		case 'LOGIN_SUCCESS':
			return {
				...state,
				token: action.payload.token,
				loading: false,
			};
		case 'LOGIN_FAILURE':
			return {
				...state,
				error: action.payload.error,
				loading: false,
			};
		case 'LOGOUT':
			return {
				...state,
				token: null,
			};
		case 'REGISTER':
			return {
				...state,
				loading: true,
			};
		case 'REGISTER_SUCCESS':
			return {
				...state,
				loading: false,
			};
		case 'REGISTER_FAILURE':
			return {
				...state,
				error: action.payload.error,
				loading: false,
			};
		case 'CLEAR_ERROR':
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};
