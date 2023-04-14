import { Request, Response } from 'express';

const subirPuntoTesis = (req: Request, res: Response) => {
	res.status(200).json({ message: 'Punto de tesis subido correctamente' });
};

const subirTesis = (req: Request, res: Response) => {
	res.status(200).json({ message: 'Tesis subida correctamente' });
};

export { subirPuntoTesis, subirTesis };
