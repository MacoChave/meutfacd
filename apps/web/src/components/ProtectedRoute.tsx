import React from 'react';
import { Outlet } from 'react-router-dom';

export type ProtectedRouteProps = {
	children?: React.ReactNode;
	rol:
		| 'estudiante'
		| 'profesor'
		| 'administrador'
		| 'encargado'
		| 'analitica';
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, rol }) => {
	// FETCH ROL LOGGED USER FROM API
	return (
		// <Suspense fallback={<SpinLoader />}>
		children ? <>{children}</> : <Outlet />
		// </Suspense>
	);
};

export default ProtectedRoute;
