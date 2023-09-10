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
		const authHeader = req.headers.authorization;

		if (!authHeader || !authHeader.startsWith('Bearer'))
			throw new Error('Autenticación no enviada');

		const token = authHeader.split(' ')[1];

		if (!token || token === 'null') throw new Error('Token no encontrado');

		const decodedToken = validarToken(token);

		if (!decodedToken) throw new Error('Token no válido');

		req.user = decodedToken as any;
		next();
	} catch (error: any) {
		errorHttp(res, { error, msg: 'Autenticación requerida', code: 401 });
	}
};
