import './utils/environment';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import { conectar } from './config/mysql';
import { DATA_SOURCES } from './config/vars.config';
import { router } from './routes';

const PORT = DATA_SOURCES.API_PORT;

const app = express();

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: '*',
		allowedHeaders: ['Content-Type', 'Authorization'],
	})
);
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: '/storage',
		limits: { fileSize: 50 * 1024 * 1024 },
		debug: true,
	})
);
app.use(express.static('storage'));

// ROUTES
app.use('/api', router);

app.listen(PORT, () => {
	console.log('Server is listening on port 👉', PORT);
});

// Database connection
const conectarBD = async () => {
	const conn = await conectar();
	conn.getConnection()
		.then(async () => {
			console.log('Database connected 👌');
			// await cargarRolesTutor();
			// console.log('Roles loaded...');
			// await crearUsuarioAdministrador();
			// console.log('Admin user created...');
		})
		.catch((err) => console.log('Error connecting to database 😭', err));
};
conectarBD();
