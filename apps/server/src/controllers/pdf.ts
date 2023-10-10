import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import {
	createDocument,
	getNameStation,
	setFooter,
	setHeader,
	setQRCode,
} from '../utils/pdf';
import { WriteStream, createWriteStream, readFileSync } from 'fs';
import { uploadDictamen } from './storage';
import {
	PutObjectCommand,
	PutObjectCommandInput,
	S3Client,
} from '@aws-sdk/client-s3';
import { config } from '../utils/upload';
import { formatDate } from '../utils/formats';
import { sqlSelectOne } from '../db/consultas';
import { DATA_SOURCES } from '../config/vars.config';
import { logger } from '../utils/logger';

export const createReport = async ({ body, user }: Request, res: Response) => {
	try {
		console.log({ body, user });
		const {
			idStudent,
			title,
			idReview,
			currentStation,
			nextStation,
			filename,
		} = body;

		const responsible = await sqlSelectOne({
			table: 'ut_v_usuarios',
			columns: ['nombre', 'apellidos', 'roles'],
			conditions: [
				{
					column: 'roles',
					operator: 'like',
					value: `%Encargado%${nextStation}%`,
				},
			],
		});

		const docente = await sqlSelectOne({
			table: 'ut_v_usuarios',
			columns: ['nombre', 'apellidos'],
			query: { id_usuario: user.primaryKey },
		});

		const student = await sqlSelectOne({
			table: 'usuario',
			columns: ['carnet', 'nombre', 'apellidos'],
			query: { id_usuario: idStudent },
		});

		console.log({
			responsible,
			docente,
			student,
		});

		const localFilename: string = 'src/storage/report.pdf';
		// const stream: any = writehead(nameEmisor, res);
		const doc = createDocument();

		let writeStream = createWriteStream(localFilename);
		doc.pipe(writeStream);

		setHeader(doc);

		doc.moveDown(3);
		doc.fontSize(12).text(
			`Guatemala, ${formatDate({
				date: new Date(),
				format: 'report',
				type: 'date',
			})}`,
			{
				align: 'right',
				lineGap: 2,
			}
		);

		doc.font('Helvetica-Bold');

		doc.moveDown(3);
		doc.fontSize(12).text(
			`${responsible?.nombre ?? 'Encargado'} ${
				responsible?.apellidos ?? ''
			}`.toUpperCase(),
			{
				align: 'left',
				lineGap: 2,
			}
		);

		doc.fontSize(12).text(`${responsible?.roles ?? 'Rol'}`.toUpperCase(), {
			align: 'left',
			lineGap: 2,
		});

		doc.fontSize(12).text(`FACULTAD DE CIENCIAS JURÍDICAS Y SOCIALES`, {
			align: 'left',
			lineGap: 2,
		});

		doc.fontSize(12).text(`UNIVERSIDAD DE SAN CARLOS DE GUATEMALA`, {
			align: 'left',
			lineGap: 2,
		});

		doc.font('Helvetica');
		doc.fontSize(12).moveDown(2).text(`Estimado doctor`, {
			align: 'left',
			lineGap: 2,
		});

		doc.moveDown();
		doc.fontSize(12).text(
			`Respetuosamente a usted informo que procedí a revisar la tesis del bachiller `,
			{
				align: 'left',
				lineGap: 2,
				continued: true,
			}
		);

		doc.font('Helvetica-Bold');
		doc.fontSize(12).text(
			`${student?.nombre ?? 'NOMBRES'} ${
				student?.apellidos ?? 'APELLIDOS'
			} `.toUpperCase(),
			{
				align: 'left',
				lineGap: 2,
				continued: true,
			}
		);

		doc.font('Helvetica');
		doc.fontSize(12).text(`la cual se titula `, {
			align: 'left',
			lineGap: 2,
			continued: true,
		});

		doc.font('Helvetica-Bold');
		doc.fontSize(12).text(`"${title}"`.toUpperCase(), {
			align: 'left',
			lineGap: 2,
		});

		doc.font('Helvetica');
		doc.moveDown();
		doc.fontSize(12).text(
			`Le recomendé al bachiller algunos cambios en la forma, estilo, gramática y redacción de la tesis, por lo que habiendo cumplido con los mismos emito `,
			{ align: 'left', lineGap: 2, continued: true }
		);

		doc.font('Helvetica-Bold');
		doc.fontSize(12).text(`DICTAMEN FAVORABLE `, {
			align: 'left',
			lineGap: 2,
			continued: true,
		});

		doc.font('Helvetica');
		doc.fontSize(12).text(
			`para que se le otorgue el avance a ${nextStation}.`,
			{ align: 'left', lineGap: 2 }
		);

		doc.moveDown(2);
		doc.fontSize(12).text(`Atentamente.`, { align: 'left', lineGap: 2 });

		doc.moveDown(2);
		doc.fontSize(12).text(`"ID Y ENSEÑAD A TODOS"`, {
			align: 'center',
			lineGap: 2,
		});

		doc.moveDown(3);
		doc.fontSize(12).text(
			`${docente?.nombre ?? 'NOMBRE'} ${
				docente?.apellidos ?? 'APELLIDO'
			}`,
			{
				align: 'center',
				lineGap: 2,
			}
		);

		doc.fontSize(12).text(`Docente ${currentStation}`, {
			align: 'center',
			lineGap: 2,
		});

		await setQRCode(doc, idReview);

		setFooter(doc);

		doc.flushPages();
		doc.end();

		writeStream.on('finish', async () => {
			const fileContent = readFileSync(localFilename);

			if (DATA_SOURCES.UPLOAD_S3) {
				const params: PutObjectCommandInput = {
					Bucket: 'ut-src',
					Key: `${student.carnet}/${filename}.pdf`,
					Body: fileContent,
					ACL: 'public-read',
					ContentType: 'application/pdf',
					Metadata: {
						fieldname: 'dictamen',
					},
				};
				const client = new S3Client(config);
				const result = await client.send(new PutObjectCommand(params));
				logger({
					dirname: __dirname,
					proc: 'createReport',
					message: result,
				});
			}
			res.status(200).json({ name: `${student.carnet}/${filename}.pdf` });
		});
	} catch (error: any) {
		console.log({ error });
		errorHttp(res, error);
	}
};
