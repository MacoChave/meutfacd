import './utils/environment';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import { connection } from './config/mysql';
import { DATA_SOURCES } from './config/vars.config';
import { router as routesV1 } from './routes/v1';
import { router as routesV2 } from './routes/v2';
import AppDataSource from './config/orm';

const PORT = DATA_SOURCES.API_PORT;

const app = express();

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: './temps',
		limits: { fileSize: 10 * 1024 * 1024 },
		// debug: true,
		createParentPath: true,
	})
);
app.use(express.static('storage'));

// ROUTES
app.use('/api/v1', routesV1);
app.use('/api/v2', routesV2);

const main = async () => {
	try {
		checkDBConection();
		initTypeORM();
	} catch (error) {
		console.log(error);
	}
	app.listen(PORT, () => {
		console.log('Server is listening on port 👉', PORT);
	});
};

// MySQL connection
const checkDBConection = async () => {
	const conn = await connection();
	conn.ping()
		.then(async () => {
			console.log('Database connected 👌');
		})
		.catch((err) => {
			throw new Error('Database connection failed 🤬');
		})
		.finally(() => {
			conn.end();
			console.log('Database connection closed');
		});
};

// TypeORM connection
const initTypeORM = async () => {
	try {
		await AppDataSource.initialize();
		console.log('TypeORM connected 👌');
	} catch (error) {
		throw new Error('TypeORM connection failed 🤬');
	} finally {
		// AppDataSource.close();
		// console.log('TypeORM connection closed');
	}
};

main();
