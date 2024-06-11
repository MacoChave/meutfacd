import { Request, Response } from 'express';
import AppDataSource from '../config/orm';
import { Page } from '../entities/Page';
import { errorHttp, successHttp } from '../utils/error.handle';
import { IsNull } from 'typeorm';

export const getItem = async ({ params }: Request, res: Response) => {
	try {
		let id = params.id || 0;

		let pageRepo = AppDataSource.getRepository(Page);
		let page = await pageRepo.findOne({
			relations: [],
			where: { id_pagina: +id },
		});
		successHttp(res, 200, page);
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const getChildrens = async (
	{ params, query }: Request,
	res: Response
) => {
	try {
		let take = query.take || 10;
		let skip = query.skip || 0;
		let q = query.q || '';
		let id = params.id || 0;

		let pageRepo = AppDataSource.getRepository(Page);
		let [result, total] = await pageRepo.findAndCount({
			relations: ['parent', 'childrens'],
			where: [{ parent: { id_pagina: +id } }],
			order: { indice: 'ASC' },
		});

		let next = +skip + +take;

		successHttp(res, 200, {
			data: result,
			nextCursor: next < total ? next : undefined,
		});
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export const getParentPages = async ({ query }: Request, res: Response) => {
	try {
		let take = query.take || 10;
		let skip = query.skip || 0;
		let q = query.q || '';

		let pageRepo = AppDataSource.getRepository(Page);
		let [result, total] = await pageRepo.findAndCount({
			relations: ['parent'],
			where: [{ parent: IsNull() }],
			order: { id_pagina: 'ASC' },
			take: +take,
			skip: +skip,
		});

		let next = +skip + +take;

		successHttp(res, 200, {
			data: result,
			nextCursor: next < total ? next : undefined,
		});
	} catch (error: any) {
		errorHttp(res, error);
	}
};
