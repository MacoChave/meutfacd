import express, { Express } from 'express';
import dotenv from 'dotenv';
import { router as RV1 } from './routes/v1';
dotenv.config();

const PORT: string | number = process.env.PORT || 5000;

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', RV1);

app.listen(PORT, () => {
	console.log(`🚀 Server is running on port ${PORT}`);
});
