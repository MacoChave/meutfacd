import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { router } from './routes';

const PORT = process.env.PORT || 3000;

const app = express();

// MIDDLEWARES

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// ROUTES
app.use('/api', router);

app.listen(PORT, () => {
	console.log('Server is listening on port', PORT);
});
