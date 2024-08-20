import { NextFunction, Request, Response } from 'express';
import { DATA_SOURCES } from '../config/vars.config';
import { errorHttp } from '../utils/error.handle';

export const checkVersion = (
	{ headers }: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const version = headers['version'];
		if (!version) throw new Error('Version no enviada');
		if (version !== DATA_SOURCES.API_VERSION)
			throw new Error('Version incorrecta');

		next();
	} catch (error: any) {
		errorHttp(res, error);
	}
};
