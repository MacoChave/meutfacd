import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const generarToken = (data: any) => {
	return jwt.sign(data, process.env.TOKEN_SECRET || 'secret', {
		expiresIn: '12h',
	});
};

export const validarToken = (token: string) => {
	return jwt.verify(token, process.env.TOKEN_SECRET || 'secret');
};

export const encriptarPassword = (plainPassword: string) => {
	return bcrypt.hash(plainPassword, process.env.SALT || 10);
};

export const compararPassword = (
	plainPassword: string,
	hashPassword: string
) => {
	return bcrypt.compare(plainPassword, hashPassword);
};
