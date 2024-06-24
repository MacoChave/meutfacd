import { Router } from 'express';
import { readdirSync } from 'fs';

const PATH_ROUTER = `${__dirname}`;
const router = Router();

const cleanFilename = (filename: string) => {
	return filename.split('.').shift();
};

readdirSync(PATH_ROUTER).filter((file) => {
	const cleanedName = cleanFilename(file);
	if (cleanedName !== 'index') {
		import(`./${cleanedName}`).then((module) => {
			console.log(`Cargando ruta 👉  /v1/${cleanedName}`);
			router.use(`/${cleanedName}`, module.router);
		});
	}
});

router.get('/', (req, res) => {
	res.json({
		message: 'MEUT API - v1',
		rutas: readdirSync(PATH_ROUTER).map((file) => {
			return `/${cleanFilename(file)}`;
		}),
	});
});

// router.get('*', (req, res) => {
// 	res.status(404).json({
// 		message: 'No se encontró la ruta',
// 		ruta: req.originalUrl,
// 	});
// });

export { router };
