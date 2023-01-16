import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const loginHandler = (req: Request, res: Response) => {
	try {
		// Procesar datos de req.body
		// Validar datos -> express-validator, joi, zod, etc.
		// Almacenar en BD
		// Generar token
		// Devolver token
		let token = jwt.sign(
			{
				id: 1,
				name: 'John Doe',
				email: 'john.d@mail.com',
				carnet: req.body.carnet,
			},
			'secret',
			{ expiresIn: '12h' }
		);
		res.status(200).json({ token });
	} catch (error: any) {
		res.status(500).json({ message: error.message });
	}
};

export const profileHandler = (req: Request, res: Response) => {
	try {
		return res.status(200).json({ profile: req.user });
	} catch (error) {
		return res.status(500).json({ message: error });
	}
};
