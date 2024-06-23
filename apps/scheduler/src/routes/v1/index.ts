import { Router } from 'express';
import { readdirSync } from 'fs';

const PATH_ROUTER = `${__dirname}`;
const router = Router();

const clearFilename = (filename: string) => {
	return filename.split('.').shift();
};

readdirSync(PATH_ROUTER).filter((file) => {
	const cleanedName = clearFilename(file);
	if (cleanedName !== 'index') {
		import(`./${cleanedName}`).then((module) => {
			console.log(`Loading route 👉  /v1/${cleanedName}`);
			router.use(`/${cleanedName}`, module.router);
		});
	}
});

router.get('/', (req, res) => {
	res.json({
		message: 'MEUT SCHEDULER - v1',
		routes: readdirSync(PATH_ROUTER).map((file) => {
			return `/${clearFilename(file)}`;
		}),
	});
});

export { router };
