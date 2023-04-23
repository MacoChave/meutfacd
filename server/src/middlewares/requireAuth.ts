import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { validarToken } from '../utils/token';

export const requireAuth = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader || !authHeader.startsWith('Bearer')) {
		return res.status(401).json({ message: 'Autenticación no enviada' });
	}

	const token = authHeader.split(' ')[1];

	if (!token || token === 'null')
		return res.status(401).json({ message: 'Token no encontrado' });

	const decodedToken = validarToken(token);

	if (!decodedToken)
		return res.status(401).json({ message: 'Token no válido' });

	req.user = decodedToken;
	next();
};
