import { Request, Response } from 'express';
import { DATA_SOURCES } from '../config/vars.config';
import { errorHttp } from '../utils/error.handle';
import { logger } from '../utils/logger';
import { getExtFile, uploadFile } from '../utils/upload';

const uploadStudentFile = async (
	{ files, body, user }: Request,
	res: Response
) => {
	try {
		logger({ dirname: __dirname, proc: 'uploadDraft', message: files });

		if (getExtFile(files.file.name) !== 'pdf') {
			throw new Error(
				'Formato no soportado. Convierta su archivo a PDF y vuelva a intentarlo'
			);
		}

		await uploadFile(
			files.file.tempFilePath,
			files.file.name,
			user.carnet.toString(),
			body.filename
		);
		res.status(200).json({
			name: `${user.carnet}/${body.filename}.${getExtFile(
				files.file.name
			)}`,
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

		await uploadFile(
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

		await uploadFile(
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
		if (!name) {
			throw new Error('Nombre de archivo requerido');
		}

		let baseUrl = name?.includes('https')
			? ''
			: `https://${DATA_SOURCES.AWS_BUCKET_NAME}.s3.amazonaws.com/`;

		res.status(200).json({
			url: `${baseUrl}${name}`,
		});
	} catch (error: any) {
		errorHttp(res, error);
	}
};

export {
	getFile,
	uploadStudentFile as uploadDraft,
	uploadDictamen,
	uploadTesis,
};
