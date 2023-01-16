import { useReducer } from 'react';
import { AuthProviderProps } from '../propTypes/AuthProvider';
import { authReducer } from './AuthReducer';
import { AuthContext } from './AuthContext';
import { AuthState } from '../interfaces/AuthState';

const INIT_STATE: AuthState = {
	carnet: null,
	token: null,
	loading: true,
	error: null,
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [state, dispatch] = useReducer(authReducer, INIT_STATE);

	return (
		<AuthContext.Provider value={{ state, dispatch }}>
			{children}
		</AuthContext.Provider>
	);
};
