import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { DATA_SOURCES } from '../config/vars.config';

const jwtOptions = {
	expiresIn: DATA_SOURCES.TOKEN_EXPIRES,
};

export const generarToken = (data: any) => {
	return jwt.sign(data, DATA_SOURCES.TOKEN_SECRET, jwtOptions);
};

export const validarToken = (token: string): JwtPayload | string => {
	try {
		return jwt.verify(token, DATA_SOURCES.TOKEN_SECRET);
	} catch (error) {
		throw new Error('La sesión ha expirado');
	}
};

export const encriptarPassword = (plainPassword: string) => {
	return bcrypt.hash(plainPassword, DATA_SOURCES.SALT);
};

export const compararPassword = (
	plainPassword: string,
	hashPassword: string
) => {
	return bcrypt.compare(plainPassword, hashPassword);
};
