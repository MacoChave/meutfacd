import { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({
	isAllowed,
	children,
}: {
	isAllowed: boolean;
	children?: ReactNode;
}) => {
	if (!isAllowed) return <Navigate to='/' />;

	return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
