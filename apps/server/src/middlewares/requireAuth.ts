import { NextFunction, Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import { validarToken } from '../utils/token';

// TODO: Evaluar pros y contras de evaluar token en cada sistema o en microservicio autenticación
export const requireAuth = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		console.log({
			date: new Date().toLocaleString('es-GT', {
				timeZone: 'America/Guatemala',
			}),
			authorization: req.headers.authorization,
			path: req.path,
			baseURL: req.baseUrl,
			body: req.body,
			params: req.params,
			query: req.query,
		});
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer'))
			throw new Error('Autenticación no enviada');

		const token = authHeader.split(' ')[1];

		if (!token || token === 'null') throw new Error('Token no encontrado');

		const decodedToken = validarToken(token);
		console.log('decodedToken', decodedToken);

		if (!decodedToken) throw new Error('Token no válido');

		req.user = decodedToken as any;
		console.log('[REQUIRE AUTH][REQUIRE AUTH] User', decodedToken);
		next();
	} catch (error: any) {
		errorHttp(res, { error, msg: 'Autenticación requerida', code: 401 });
	}
};
