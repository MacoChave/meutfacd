import { Request, Response } from 'express';
import { handleHttp } from '../utils/error.handle';

export const jornadaById = (req: Request, res: Response) => {
	try {
		res.status(200).json({});
	} catch (error: any) {
		handleHttp(res, 'Error al obtener la jornada');
	}
};
