import './utils/environment';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import { connection } from './config/mysql';
import { DATA_SOURCES } from './config/vars.config';
import { router } from './routes';
import { AppDataSource } from './config/orm';

const PORT = DATA_SOURCES.API_PORT;

const app = express();

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: './storage',
		limits: { fileSize: 10 * 1024 * 1024 },
		// debug: true,
		createParentPath: true,
	})
);
app.use(express.static('storage'));

// ROUTES
app.use('/api', router);

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
		});
};

// TypeORM connection
const initTypeORM = async () => {
	try {
		await AppDataSource.initialize();
		console.log('TypeORM connected 👌');
	} catch (error) {
		throw new Error('TypeORM connection failed 🤬');
	}
};

main();
