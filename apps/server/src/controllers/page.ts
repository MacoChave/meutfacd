import { Request, Response } from 'express';
import { UTPagina } from '../entities/Pagina';
import {
	getAllChildrensPage,
	getAllParentsPage,
} from '../services/pagina.service';
import { errorHttp, successHttp } from '../utils/error.handle';

export const getItem = async ({ params }: Request, res: Response) => {
	try {
		successHttp(res, 200, {});
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const getChildrens = async (
	{ params, query }: Request,
	res: Response
) => {
	try {
		let response: UTPagina[] = await getAllChildrensPage();
		successHttp(res, 200, response);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const getParentPages = async ({ query }: Request, res: Response) => {
	try {
		let response: UTPagina[] = await getAllParentsPage();
		successHttp(res, 200, response);
	} catch (error: any) {
		errorHttp(res, error);
	}
};
