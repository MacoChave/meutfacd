import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { DATA_SOURCES } from '../config/vars.config';

const jwtOptions = {
	expiresIn: DATA_SOURCES.JWT_EXPIRATION,
};

export const generarToken = (data: any) => {
	return jwt.sign(data, DATA_SOURCES.JWT_SECRET, jwtOptions);
};

export const validarToken = (token: string): JwtPayload | string => {
	try {
		return jwt.verify(token, DATA_SOURCES.JWT_SECRET);
	} catch (error) {
		throw new Error('La sesión ha expirado');
	}
};

export const encryptPassword = (plainPassword: string) => {
	return bcrypt.hash(plainPassword, DATA_SOURCES.SALT);
};

export const comparePassword = (
	plainPassword: string,
	hashPassword: string
) => {
	return bcrypt.compare(plainPassword, hashPassword);
};
