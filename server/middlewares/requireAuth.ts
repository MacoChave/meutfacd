import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const requireAuth = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	let authHeader = req.headers.authorization;

	if (!authHeader)
		return res.status(401).json({ message: 'Usuario no autorizado' });

	let token = authHeader.split(' ')[1];
	if (!token)
		return res.status(401).json({ message: 'Usuario no autorizado' });

	jwt.verify(token, 'secret', (err, user) => {
		if (err)
			return res.status(403).json({ message: 'Usuario no autorizado' });
		req.user = user;
		next();
	});
};
