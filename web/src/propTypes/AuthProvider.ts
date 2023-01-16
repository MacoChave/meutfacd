import { AuthAction } from '../contexts/AuthReducer';
import { AuthState } from '../interfaces/AuthState';

export interface AuthProviderProps {
	children: React.ReactNode;
}

export type AuthContextProps = {
	state: AuthState;
	dispatch: React.Dispatch<AuthAction>;
};
