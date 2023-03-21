import { Response } from 'express';

const handleHttp = (
	res: Response,
	{ error, msg }: { error: string; msg: string }
) => {
	console.log({ error, msg });
	res.status(500);
	res.json({ message: msg });
};

export { handleHttp };
