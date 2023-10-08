import { Request, Response } from 'express';
import { DATA_SOURCES } from '../config/vars.config';
import { errorHttp } from '../utils/error.handle';
import { logger } from '../utils/logger';
import { getExtFile, uploadFile } from '../utils/upload';

const uploadDraft = async ({ files, user }: Request, res: Response) => {
	try {
		logger({ dirname: __dirname, proc: 'uploadDraft', message: files });

		if (getExtFile(files.draft.name) !== 'pdf') {
			throw new Error(
				'Formato no soportado. Convierta su archivo a PDF y vuelva a intentarlo'
			);
		}

		const result = await uploadFile(
			files.draft.tempFilePath,
			files.draft.name,
			user.carnet.toString(),
			'preview'
		);
		res.status(200).json({
			name: `${user.carnet}/preview.${getExtFile(files.draft.name)}`,
		});
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const uploadTesis = async ({ files, user }: Request, res: Response) => {
	try {
		logger({ dirname: __dirname, proc: 'uploadTesis', message: files });

		if (getExtFile(files) !== 'pdf') {
			throw new Error(
				'Formato no soportado. Convierta su archivo a PDF y vuelva a intentarlo'
			);
		}

		const result = await uploadFile(
			files.thesis.tempFilePath,
			files.thesis.name,
			user.carnet.toString(),
			'thesis'
		);
		res.status(200).json({
			name: `${user.carnet}/thesis.${getExtFile(files.thesis.name)}`,
		});
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const uploadDictamen = async ({ files, user }: Request, res: Response) => {
	try {
		logger({ dirname: __dirname, proc: 'uploadDictamen', message: files });

		if (getExtFile(files) !== 'pdf') {
			throw new Error(
				'Formato no soportado. Convierta su archivo a PDF y vuelva a intentarlo'
			);
		}

		const result = await uploadFile(
			files.dictamen.tempFilePath,
			files.dictamen.name,
			user.carnet.toString(),
			'dictamen'
		);
		res.status(200).json({
			name: `${user.carnet}/dictamen.${getExtFile(files.dictamen.name)}`,
		});
	} catch (error: any) {
		errorHttp(res, error);
	}
};

const getFile = async ({ query }: Request, res: Response) => {
	try {
		const { name } = query;
		res.status(200).json({
			url: `https://${DATA_SOURCES.AWS_BUCKET_NAME}.s3.amazonaws.com/${name}`,
		});
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export { getFile, uploadDraft, uploadDictamen, uploadTesis };
