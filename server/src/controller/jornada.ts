import { Request, Response } from 'express';

export const jornadaById = (req: Request, res: Response) => {
	try {
		res.status(200).json({});
	} catch (error: any) {
		res.status(500).json({ messae: error });
	}
};
