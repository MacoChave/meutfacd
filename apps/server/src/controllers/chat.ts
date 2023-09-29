import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import { sqlInsert, sqlSelect, sqlSelectOne } from '../db/consultas';

// CREATE CHAT
export const createChat = async ({ body, user }: Request, res: Response) => {
	try {
		const chat = await sqlInsert({
			table: 'ut_chat',
			datos: {
				miembros: JSON.stringify([...body.miembros, user.primaryKey]),
			},
		});
		res.status(200).json(chat);
	} catch (error: any) {
		console.log({ error });
		errorHttp(res, {
			error,
			msg: 'No se puede crear el chat',
			code: 500,
		});
	}
};

// FIND USER CHATS
export const findUserChats = async ({ user }: Request, res: Response) => {
	try {
		const chats = await sqlSelect({
			table: 'ut_chat',
			conditions: [
				{
					column: 'miembros',
					operator: 'JSON_CONTAINS',
					value: user.primaryKey,
				},
			],
		});
		res.status(200).json(chats);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede obtener los chats',
			code: 500,
		});
	}
};

// FIND CHAT
export const findChat = async ({ query, user }: Request, res: Response) => {
	try {
		const chat = await sqlSelectOne({
			table: 'ut_chat',
			conditions: [
				{
					column: 'miembros',
					operator: 'JSON_CONTAINS',
					value: query.user_id,
				},
				{
					column: 'miembros',
					operator: 'JSON_CONTAINS',
					value: user.primaryKey,
				},
			],
			condInclusives: true,
		});
		res.status(200).json(chat);
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'No se puede obtener los chats',
			code: 500,
		});
	}
};

// GET USER CHATS
