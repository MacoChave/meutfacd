import './utils/environment';
import cors from 'cors';
import express from 'express';
import fileUpload from 'express-fileupload';
import { connection } from './config/mysql';
import { DATA_SOURCES } from './config/vars.config';
import { router } from './routes';

const PORT = DATA_SOURCES.API_PORT;

const app = express();

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
	fileUpload({
		useTempFiles: true,
		tempFileDir: '/storage',
		limits: { fileSize: 10 * 1024 * 1024 },
		// debug: true,
		createParentPath: true,
	})
);
app.use(express.static('storage'));

// ROUTES
app.use('/api', router);

app.listen(PORT, () => {
	console.log('Server is listening on port 👉', PORT);
});

// Database connection
const checkDBConection = async () => {
	const conn = await connection();
	conn.ping()
		.then(async () => {
			console.log('Database connected 👌');
		})
		.catch((err) => console.log('Error connecting to database 😭', err))
		.finally(() => conn.end());
};
checkDBConection();
