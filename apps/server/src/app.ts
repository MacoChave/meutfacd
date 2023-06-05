import './utils/environment';
import { DATA_SOURCES } from './config/vars.config';
import cors from 'cors';
import express from 'express';
import { router } from './routes';
import { crearUsuarioAdministrador } from './db/consultas';
import { conectar } from './config/mysql';

const PORT = DATA_SOURCES.PORT;

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

// ROUTES
app.use('/api', router);

app.listen(PORT, () => {
	console.log('Server is listening on port', PORT);
});

// Database connection
const conectarBD = async () => {
	const conn = await conectar();
	conn.getConnection()
		.then(() => {
			console.log('Database connected');
			crearUsuarioAdministrador();
		})
		.catch((err) => console.log('Error connecting to database', err));
};
conectarBD();
