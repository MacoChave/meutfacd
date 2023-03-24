import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router } from './routes';
import db from './config/db';
import { cargarRolesTutor } from './db/consultas';

const PORT = process.env.PORT || 3000;

const app = express();

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB
db.authenticate()
	.then(async () => {
		console.log('Database connected');
		// Cargar roles de profesor
		// await db.sync({ force: true });
		// await cargarRolesTutor();
		console.log('Roles cargados');
	})
	.catch((err) => console.log('Error: ' + err));

// ROUTES
app.use('/api', router);

app.listen(PORT, () => {
	console.log('Server is listening on port', PORT);
});
