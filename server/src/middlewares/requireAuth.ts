import { NextFunction, Request, Response } from 'express';
import { validarToken } from '../utils/token';

// TODO: Evaluar pros y contras de evaluar token en cada sistema o en microservicio autenticación
export const requireAuth = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log('[REQUIRE AUTH][REQUIRE AUTH] req.headers', req.headers);
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer')) {
		return res.status(401).json({ message: 'Autenticación no enviada' });
	}

	const token = authHeader.split(' ')[1];
	console.log('[REQUIRE AUTH][REQUIRE AUTH] token', token);

	if (!token || token === 'null')
		return res.status(401).json({ message: 'Token no encontrado' });

	const decodedToken = validarToken(token);

	if (!decodedToken)
		return res.status(401).json({ message: 'Token no válido' });

	req.user = decodedToken;
	console.log('[REQUIRE AUTH][REQUIRE AUTH] User', decodedToken);
	next();
};
