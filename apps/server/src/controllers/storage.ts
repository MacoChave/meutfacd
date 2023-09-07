import { Request, Response } from 'express';
import { DATA_SOURCES } from '../config/vars.config';
import { errorHttp } from '../utils/error.handle';
import { logger } from '../utils/logger';
import { getExtFile, uploadFile } from '../utils/upload';

const uploadDraft = async ({ files, user }: Request, res: Response) => {
	try {
		logger({ dirname: __dirname, proc: 'uploadDraft', message: files });
		const result = await uploadFile(
			files.draft.tempFilePath,
			files.draft.name,
			user.carnet.toString(),
			'preview'
		);
		console.log({ result });
		res.status(200).json({
			name: `${user.carnet}/preview.${getExtFile(files.draft.name)}`,
		});
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'Error al subir el punto de tesis',
			code: 500,
		});
	}
};

const uploadTesis = async ({ files, user }: Request, res: Response) => {
	try {
		logger({ dirname: __dirname, proc: 'uploadTesis', message: files });
		const result = await uploadFile(
			files.thesis.tempFilePath,
			files.thesis.name,
			user.carnet.toString(),
			'thesis'
		);
		console.log(result);
		res.status(200).json({
			name: `${user.carnet}/thesis.${getExtFile(files.thesis.name)}`,
		});
	} catch (error: any) {
		res.status(500).json({ error: 'Error al subir la tesis' });
	}
};

const uploadDictamen = async ({ files, user }: Request, res: Response) => {
	try {
		logger({ dirname: __dirname, proc: 'uploadDictamen', message: files });
		const result = await uploadFile(
			files.dictamen.tempFilePath,
			files.dictamen.name,
			user.carnet.toString(),
			'dictamen'
		);
		console.log(result);
		res.status(200).json({
			name: `${user.carnet}/dictamen.${getExtFile(files.dictamen.name)}`,
		});
	} catch (error: any) {
		res.status(500).json({ error: 'Error al subir la dictamen' });
	}
};

const getFile = async ({ query }: Request, res: Response) => {
	try {
		const { name } = query;
		res.status(200).json({
			url: `https://${DATA_SOURCES.AWS_BUCKET_NAME}.s3.amazonaws.com/${name}`,
		});
	} catch (error: any) {
		errorHttp(res, {
			error,
			msg: 'Error al descargar el archivo',
			code: 500,
		});
	}
};

export { getFile, uploadDraft, uploadDictamen, uploadTesis };
