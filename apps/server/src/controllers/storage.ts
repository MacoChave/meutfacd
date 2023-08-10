import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { downloadFile, uploadFile } from '../utils/upload';
import { createReadStream, createWriteStream } from 'fs';
import { errorHttp } from '../utils/error.handle';
import { DATA_SOURCES } from '../config/vars.config';

const uploadDraft = async ({ files, user }: Request, res: Response) => {
	try {
		logger({ dirname: __dirname, proc: 'uploadDraft', message: files });
		const result = await uploadFile(
			files.draft.tempFilePath,
			files.draft.name,
			user.carnet
		);
		console.log({ result });
		res.status(200).json({ name: `${user.carnet}_${files.draft.name}` });
	} catch (error: any) {
		errorHttp(res, { error, msg: 'Error al subir el borrador', code: 500 });
	}
};

const uploadTesis = async ({ files, user }: Request, res: Response) => {
	try {
		logger({ dirname: __dirname, proc: 'uploadTesis', message: files });
		const result = await uploadFile(
			files.tesis.tempFilePath,
			files.tesis.name,
			user.carnet
		);
		console.log(result);
		res.status(200).json({ success: 'Tesis subida correctamente' });
	} catch (error: any) {
		res.status(500).json({ error: 'Error al subir la tesis' });
	}
};

const getFile = async ({ query }: Request, res: Response) => {
	try {
		const { name } = query;
		// const result = await downloadFile(name as string);
		// if (!result) {
		// 	res.status(404).json({ error: 'Archivo no encontrado' });
		// }

		// result.Body.pipe(createWriteStream(`./src/storage/${name}`));

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

export { uploadDraft, uploadTesis, getFile };
