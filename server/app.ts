import express from 'express';
import authRouter from './routes/auth.router';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	cors({
		origin: 'http://localhost:5173',
	})
);

app.use('/auth', authRouter);

export default app;
