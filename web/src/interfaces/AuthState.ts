export interface AuthState {
	carnet: string | null;
	token: string | null;
	loading: boolean;
	error: string | null;
}
