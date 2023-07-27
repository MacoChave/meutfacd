import { Request, Response } from 'express';
import { logger } from '../utils/logger';
import { downloadFile, uploadFile } from '../utils/upload';
import { createWriteStream } from 'fs';
import { errorHttp } from '../utils/error.handle';

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
	} catch (error) {
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
	} catch (error) {
		res.status(500).json({ error: 'Error al subir la tesis' });
	}
};

const getFile = async ({ query }: Request, res: Response) => {
	try {
		const { carnet, name } = query;
		const result = await downloadFile(
			carnet?.toString() || '',
			name?.toString() || ''
		);
		if (!result) {
			res.status(404).json({ error: 'Archivo no encontrado' });
		}
		const fileDownloaded = createWriteStream('../storage/newFile.pdf');

		res.status(200).json({
			success: 'Archivo descargado con éxito',
			result,
		});
	} catch (error) {
		res.status(500).json({ error: 'Error al descargar el archivo' });
	}
};

export { uploadDraft, uploadTesis, getFile };
