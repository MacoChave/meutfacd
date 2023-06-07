import { AxiosError } from 'axios';
import React from 'react';

export type ErrorOperacionProps = {
	mensaje: string;
	error: any;
};

const ErrorOperacion: React.FC<ErrorOperacionProps> = ({ mensaje, error }) => {
	console.error('> Error operacional', error);
	return <div>mensaje</div>;
};

export default ErrorOperacion;
