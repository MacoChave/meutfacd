import { Request, Response } from 'express';
import {
	sqlEjecutar,
	sqlInsert,
	sqlSelect,
	sqlSelectOne,
} from '../db/consultas';
import { errorHttp } from '../utils/error.handle';
import { SQL_OPERATORS } from '../utils/consts';

// CREATE CHAT
export const createChat = async ({ query, user }: Request, res: Response) => {
	console.log({ query, user });
	try {
		const chats: any = await sqlSelectOne({
			table: 'ut_v_chat',
			conditions: [
				{
					column: 'miembros',
					operator: SQL_OPERATORS.JSON_CONTAINS,
					value: query.user_id,
				},
				{
					column: 'miembros',
					operator: SQL_OPERATORS.JSON_CONTAINS,
					value: user.primaryKey,
				},
			],
			condInclusives: true,
		});
		console.log({ chats });
		if (chats !== undefined) {
			throw new Error('Ya existe un chat con ese usuario');
		}
		const newChat = await sqlInsert({
			table: 'ut_chat',
			datos: {
				miembros: JSON.stringify([
					Number(query.user_id),
					Number(user.primaryKey),
				]),
			},
		});
		res.status(200).json(newChat);
	} catch (error: any) {
		console.log({ error });
		errorHttp(res, error);
	}
};

// FIND USER CHATS
export const findUserChats = async ({ user }: Request, res: Response) => {
	try {
		const chats = await sqlSelect({
			table: 'ut_v_chat',
			conditions: [
				{
					column: 'miembros',
					operator: SQL_OPERATORS.JSON_CONTAINS,
					value: user.primaryKey,
				},
			],
		});
		res.status(200).json(chats);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

// FIND CHAT
export const findChat = async ({ query, user }: Request, res: Response) => {
	try {
		const chats: any = await sqlSelect({
			table: 'ut_v_chat',
			conditions: [
				{
					column: 'miembros',
					operator: SQL_OPERATORS.JSON_CONTAINS,
					value: user.primaryKey,
				},
				{
					column: 'miembros',
					operator: SQL_OPERATORS.JSON_CONTAINS,
					value: query.user_id,
				},
			],
		});
		console.log({ chats });
		res.status(200).json(chats[0]);
	} catch (error: any) {
		errorHttp(res, error);
	}
};
