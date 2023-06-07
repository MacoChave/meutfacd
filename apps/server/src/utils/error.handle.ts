import { Response } from 'express';

type errorHttpType = {
	msg: string;
	error?: any;
	code?: number;
};

const errorHttp = (res: Response, { error, msg, code }: errorHttpType) => {
	console.log({ error, msg, code });
	res.status(code || 500).json({ error: msg });
};

export { errorHttp };
