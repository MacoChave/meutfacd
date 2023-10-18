import { Request, Response } from 'express';
import {
	sqlDelete,
	sqlInsert,
	sqlSelect,
	sqlSelectOne,
	sqlUpdate,
} from '../db/consultas';
import { errorHttp } from '../utils/error.handle';
import { DATA_SOURCES } from '../config/vars.config';
import { getBodyFromActivity, sendEmail } from '../utils/email';

export const getItem = async ({ query, user }: Request, res: Response) => {
	try {
		const response = await sqlSelectOne({
			table: 'ut_notificacion',
			query: { id_receptor: user.primaryKey },
		});
		res.status(200).json(response);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const getItems = async ({ query, user }: Request, res: Response) => {
	try {
		const response = await sqlSelect({
			table: 'ut_v_notification',
			query: { ...query, id_receptor: user.primaryKey },
		});
		res.status(200).json(response);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const postItem = async ({ body, user }: Request, res: Response) => {
	try {
		const receiver = await sqlSelectOne({
			table: 'usuario',
			query: { id_usuario: body.id_receptor },
		});

		console.log({ receiver });

		if (!receiver) {
			throw new Error('El usuario receptor no existe');
		}

		if (DATA_SOURCES.SEND_EMAIL) {
			await sendEmail({
				to: receiver.correo,
				plainText: 'Por favor, revisa tus notificaciones en la app',
				subject: 'Nueva notificación en el sistema',
				content: getBodyFromActivity({
					username: receiver?.nombre ?? '',
					action: 'creado',
					description: 'Se ha creado una nueva notificación para ti',
					title: 'Nueva notificación',
				}),
			});
		}

		const response = await sqlInsert({
			table: 'ut_notificacion',
			datos: {
				mensaje: body.mensaje,
				id_emisor: user.primaryKey,
				id_receptor: body.id_receptor,
			},
		});
		res.status(200).json(response);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const putItem = async ({ body, query }: Request, res: Response) => {
	try {
		const response = await sqlUpdate({
			table: 'ut_notificacion',
			datos: body,
			query,
		});
		res.status(200).json(response);
	} catch (error) {
		errorHttp(res, error as any);
	}
};

export const deleteItem = async ({ query }: Request, res: Response) => {
	try {
		const response = await sqlDelete({
			table: 'ut_notifcacion',
			query,
		});
		res.status(200).json(response);
	} catch (error) {
		errorHttp(res, error as any);
	}
};
