import { Response } from 'express';
import { JsonWebTokenError, Jwt } from 'jsonwebtoken';
import { QueryError } from 'mysql2';
import AppDataSource from '../config/orm';

const verifyOrm = () => {
	if (!AppDataSource.isConnected)
		throw new Error('No hay conexión a la base de datos');
};

const responseJson = (code: number, message: any) => {
	return {
		code,
		message:
			code == 200 ? message : 'Ocurrió un error. Ver propiedad error',
		error: code != 200 ? message : '',
	};
};

const successHttp = (res: Response, code: number = 200, message: any) => {
	res.status(code).json(responseJson(code, message));
};

const errorHttp = (
	res: Response,
	error: QueryError | JsonWebTokenError | Error
) => {
	if (error instanceof JsonWebTokenError) {
		console.log('JwonWebTokenError', error);
		res.status(401).json(responseJson(401, error.message));
		return;
	} else if ((error as QueryError)?.errno === undefined) {
		res.status(401).json(responseJson(500, error.message));
		return;
	}

	const errorCode = (error as QueryError)?.errno ?? 0;

	if (errorCode === 1062) {
		res.status(400).json(responseJson(400, 'El registro ya existe'));
	} else if (errorCode === 1451) {
		res.status(400).json(
			responseJson(
				400,
				'El registro no se puede eliminar. Hay datos asociados'
			)
		);
	} else if (
		[1366, 1364, 1048, 1265, 1292, 1367, 1292].some((e) => e === errorCode)
	) {
		res.status(400).json(
			responseJson(400, 'El registro contiene datos no válidos')
		);
	} else if (errorCode === 1172) {
		res.status(400).json(
			responseJson(400, 'El registro contiene datos no válidos')
		);
	} else if (errorCode === 1406) {
		res.status(400).json(
			responseJson(400, 'Revisar la longitud de los datos')
		);
	} else {
		console.log('Unknown', error);
		res.status(500).json(responseJson(400, 'Error interno del servicio'));
	}
};

export { successHttp, errorHttp, verifyOrm };
