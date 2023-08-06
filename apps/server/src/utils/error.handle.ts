import { Response } from 'express';
import { QueryError } from 'mysql2';

type errorHttpType = {
	msg: string;
	error?: QueryError;
	code?: number;
};

const errorHttp = (res: Response, { error, msg, code }: errorHttpType) => {
	console.log({ error, msg, code });

	if (error?.errno === 1062) {
		res.status(400).json({ error: 'El registro ya existe' });
	} else if (error?.errno === 1451) {
		res.status(400).json({
			error: 'El registro no se puede eliminar. Hay datos asociados',
		});
	} else if (
		[1366, 1364, 1048, 1265, 1292, 1367, 1292].some(
			(e) => e === error?.errno
		)
	) {
		res.status(400).json({
			error: 'El registro contiene datos no válidos',
		});
	} else {
		res.status(code || 500).json({
			error: msg || 'Error interno del servidor',
		});
	}
};

export { errorHttp };
