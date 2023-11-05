import { Response } from 'express';
import { JsonWebTokenError, Jwt } from 'jsonwebtoken';
import { QueryError } from 'mysql2';

type errorHttpType = {
	msg: string;
	error?: QueryError | JsonWebTokenError | Error;
	code?: number;
};

const errorHttp = (
	res: Response,
	error: QueryError | JsonWebTokenError | Error
) => {
	if (error instanceof JsonWebTokenError) {
		console.log('JwonWebTokenError', error);
		res.status(401).json({ error: error.message });
		return;
	} else if ((error as QueryError)?.errno === undefined) {
		res.status(500).json({ error: error.message });
		return;
	}

	const errorCode = (error as QueryError)?.errno ?? 0;

	if (errorCode === 1062) {
		res.status(400).json({ error: 'El registro ya existe' });
	} else if (errorCode === 1451) {
		res.status(400).json({
			error: 'El registro no se puede eliminar. Hay datos asociados',
		});
	} else if (
		[1366, 1364, 1048, 1265, 1292, 1367, 1292].some((e) => e === errorCode)
	) {
		res.status(400).json({
			error: 'El registro contiene datos no válidos',
		});
	} else if (errorCode === 1172) {
		res.status(400).json({
			error: 'El registro contiene datos no válidos',
		});
	} else if (errorCode === 1406) {
		res.status(400).json({
			error: 'Revisar la longitud de los datos',
		});
	} else {
		console.log('Unknown', error);
		res.status(500).json({
			error: 'Error interno del servidor',
		});
	}
};

export { errorHttp };
