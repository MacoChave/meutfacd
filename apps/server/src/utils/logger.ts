import { appendFile } from 'fs';

type loggerType = {
	dirname: string;
	proc: string;
	message: string;
};
export const logger = ({ dirname, proc, message }: loggerType) => {
	console.log({
		dirname,
		proc,
		message,
	});
	const filename = dirname.split('\\').pop();
	appendFile(
		`.log`,
		` ========== ========== ========== >
> ${new Date().toISOString()}
> [${filename}] [${proc}] 
${JSON.stringify(message)}
< ========== ========== ==========\n`,
		(err) => {
			if (err) throw err;
		}
	);
};
