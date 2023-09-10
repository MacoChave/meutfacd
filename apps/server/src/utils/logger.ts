import { appendFile } from 'fs';
import { formatDate } from './formats';

type loggerType = {
	dirname: string;
	proc: string;
	message: string | object;
};

const ENVIRONMENTS = ['development', 'test'];

export const logger = ({ dirname, proc, message }: loggerType) => {
	const isDev: boolean = ENVIRONMENTS.some((env) =>
		process.env.NODE_ENV.includes(env)
	);

	if (isDev) {
		console.log({
			dirname,
			proc,
			message,
		});
	}
	const filename = dirname.split('\\').pop();
	appendFile(
		`.log`,
		` ========== ========== ========== >
=> ${formatDate({ date: new Date(), format: 'mysql', type: 'datetime' })}
=> [${filename}] [${proc}] 
${typeof message === 'string' ? message : JSON.stringify(message)}
< ========== ========== ==========\n`,
		(err) => {
			if (err) throw err;
		}
	);
};
