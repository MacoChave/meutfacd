import { createContext } from 'react';
import { AuthContextProps } from '../propTypes/AuthProvider';

export const AuthContext = createContext<AuthContextProps>(
	{} as AuthContextProps
);
