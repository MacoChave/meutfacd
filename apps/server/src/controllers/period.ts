import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';

export const jornadaById = (req: Request, res: Response) => {
	try {
		res.status(200).json({});
	} catch (error: any) {
		errorHttp(res, { msg: 'Error al crear usuario', error });
	}
};
