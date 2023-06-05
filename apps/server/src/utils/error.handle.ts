import { Response } from 'express';

type errorHttpType = {
	msg: string;
	error?: any;
	code?: number;
};

const errorHttp = (res: Response, { error, msg, code }: errorHttpType) => {
	console.log({ error, msg });
	res.status(code || 500);
	res.json({ message: msg });
};

export { errorHttp };
