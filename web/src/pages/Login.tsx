import { useAuthStore } from '../store/auth';

const Login = () => {
	const setToken = useAuthStore((state) => state.setToken);

	return <div>Login</div>;
};

export default Login;
