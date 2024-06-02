import {
	PutObjectCommand,
	PutObjectCommandInput,
	S3Client,
} from '@aws-sdk/client-s3';
import { Request, Response } from 'express';
import { createWriteStream, readFileSync } from 'fs';
import { DATA_SOURCES } from '../config/vars.config';
import { sqlSelectOne } from '../db/consultas';
import { errorHttp } from '../utils/error.handle';
import { logger } from '../utils/logger';
import {
	createDocument,
	formatStationName,
	setContentDictamen,
	setCurrentDate,
	setDestinyAddress,
	setFooter,
	setInfoSignature,
	setLetterHead,
	setQRCode,
} from '../utils/pdf';
import { config } from '../utils/upload';
import { formatDate } from '../utils/formats';

export const createReport = async ({ body, user }: Request, res: Response) => {
	try {
		const {
			idStudent,
			title,
			idReview,
			currentStation,
			nextStation,
			filename,
		} = body;

		const [responsible, docente, student] = await Promise.all([
			sqlSelectOne({
				table: 'ut_v_usuarios',
				columns: ['nombre', 'apellidos', 'roles'],
				conditions: [
					{
						column: 'roles',
						operator: 'like',
						value: `%Encargado ${nextStation}%`,
					},
				],
			}),
			sqlSelectOne({
				table: 'ut_v_usuarios',
				columns: ['nombre', 'apellidos'],
				query: { id_usuario: user.primaryKey },
			}),
			sqlSelectOne({
				table: 'usuario',
				columns: ['carnet', 'nombre', 'apellidos'],
				query: { id_usuario: idStudent },
			}),
		]);

		console.log({ responsible, docente, student });

		const localFilename: string = 'src/storage/report.pdf';
		// const stream: any = writehead(nameEmisor, res);
		const doc = createDocument();

		let writeStream = createWriteStream(localFilename);
		doc.pipe(writeStream);

		setLetterHead(doc);

		doc.moveDown(3);

		setCurrentDate(doc);

		doc.font('NotoSans-Bold');

		doc.moveDown(3);

		setDestinyAddress({
			doc,
			fullname: `${responsible?.nombre ?? 'Doctor Carlos Ebertito'} ${
				responsible?.apellidos ?? 'Herrera Recinos'
			}`,
			rol: `${
				responsible?.roles ?? 'Jefe de Unidad de Asesoría de Tesis'
			}`,
		});

		doc.font('NotoSans');
		doc.fontSize(12).moveDown(2).text(`Estimado`, {
			align: 'left',
			lineGap: 2,
		});

		// SET CONTENT DICTAMEN
		setContentDictamen({
			doc,
			fullname: `${student?.nombre ?? ''} ${student?.apellidos ?? ''}`,
			title: title,
			nextStation: formatStationName(
				filename === 'Nombramiento'
					? 'Nombramiento asesor'
					: nextStation
			),
			station: formatStationName(
				filename === 'Nombramiento' ? filename : currentStation
			),
		});

		doc.moveDown(2);
		doc.fontSize(12).text(`Atentamente.`, { align: 'left', lineGap: 2 });

		doc.moveDown(2);
		doc.fontSize(12).text(`"ID Y ENSEÑAD A TODOS"`, {
			align: 'center',
			lineGap: 2,
		});

		doc.moveDown(3);

		setInfoSignature({
			doc,
			fullname: `${docente?.nombre ?? ''} ${docente?.apellidos ?? ''}`,
			rol: `Docente consejero de ${currentStation}`,
		});

		doc.moveUp(4);
		await setQRCode(doc, idReview);

		setFooter(doc);

		doc.flushPages();
		doc.end();

		writeStream.on('finish', async () => {
			const fileContent = readFileSync(localFilename);

			if (DATA_SOURCES.UPLOAD_S3) {
				const params: PutObjectCommandInput = {
					Bucket: DATA_SOURCES.AWS_BUCKET_NAME,
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

export const createStudentSupport = async (
	{ body, user }: Request,
	res: Response
) => {
	try {
		const { idStudent, support, idReview, filename } = body;

		const [student, thesis] = await Promise.all([
			sqlSelectOne({
				table: 'usuario',
				columns: ['carnet', 'nombre', 'apellidos'],
				query: { id_usuario: idStudent },
			}),
			sqlSelectOne({
				table: 'ut_tesis',
				columns: ['titulo'],
				query: { id_estudiante: idStudent },
			}),
		]);

		const localFilename: string = 'src/storage/report.pdf';
		// const stream: any = writehead(nameEmisor, res);
		const doc = createDocument();

		let writeStream = createWriteStream(localFilename);
		doc.pipe(writeStream);

		doc.font('NotoSans');

		setLetterHead(doc);
		doc.moveDown(3);

		doc.fontSize(8).text(`D. NOM ${idReview} ${new Date().getFullYear()}`, {
			align: 'right',
		});

		doc.fontSize(10);

		doc.text(
			`Facultad de Ciencias Jurídicas y Sociales, Unidad de Asesoría de Tesis. Ciudad de Guatemala, ${formatDate(
				{ date: new Date(), format: 'report', type: 'date' }
			)}.`
		);

		doc.moveDown();

		doc.text(`Atentamente pase al (a) Profesional `, { continued: true });
		doc.text('__________________________________________________________', {
			continued: true,
		});

		doc.text(
			`, para que proceda a asesorar el trabajo de tesis del (a) estudiante `,
			{ continued: true }
		);
		doc.text('__________________________________________________________', {
			continued: true,
		});

		doc.text(`, con carné `, { continued: true });
		doc.text('_________________________', { continued: true });

		doc.text(`, intitulado `, { continued: true });
		doc.text(
			'__________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________'
		);

		doc.text(
			'Hago de su conocimiento que está facultado (a) para recomendar al (a) estudiante, la modificación del bosquejo preliminar de temas, las fuentes de consulta originalmente contempladas; así como, el título de su tesis propuesto.'
		);
		doc.moveDown();

		doc.text(
			'El dictamen correspondiente se debe emitir en un plazo de no mayor de 90 días continuo a partir de concluida la investigación, en este debe hacer constar su opinión respecto del contenido científico y técnico de la tesis, la metodología y técnicas de investigación utilizadas, la redacción, los cuadros estadísticos si fueren necesarios, la redacción, los cuadros estadísticos si fueren necesarios, la contribución científica de la misma, la conclusión discursiva y la bibliografía utilizada, si aprueba o desaprueba el trabajo de investigación. Expresamente declarará que no es pariente del (a) estudiante dentro de los grados de ley y otras consideraciones que estime pertinentes.'
		);
		doc.moveDown(2);

		doc.text('Adjunto encontrará el plan de tesis respectivo');
		doc.moveDown(4);

		doc.text(`${support}`.toUpperCase(), {
			align: 'center',
		});
		doc.text('Jefe (a) de la Unidad de Asesoría de Tesis', {
			align: 'center',
		});
		doc.moveDown(2);

		// Fecha actual en formato dd/mm/yyyy
		let currentDate = new Date().toLocaleDateString('es-GT', {
			day: '2-digit',
			month: '2-digit',
			year: 'numeric',
		});

		doc.text(`Recepción ${currentDate}`, 100, doc.y, {
			width: 200,
			align: 'center',
		});
		doc.moveUp();

		doc.text('f) ______________________', 300, doc.y, {
			width: 200,
			align: 'center',
		});
		doc.text('Firma de asesor', 300, doc.y, {
			width: 200,
			align: 'center',
		});
		doc.text('(Firma y Sello)', 300, doc.y, {
			width: 200,
			align: 'center',
		});

		doc.x = 100;
		await setQRCode(doc, idReview);

		setFooter(doc);

		// Nombre del estudiante
		doc.y = 0;
		doc.moveDown(12.5);
		doc.x = 300;
		doc.font('NotoSans-Bold').text(
			`${student.nombre} ${student.apellidos}`
		);

		// Carné del estudiante
		doc.y = 0;
		doc.moveDown(14.5);
		doc.x = 400;
		doc.font('NotoSans-Bold').text(`${student.carnet}`);

		// Título de la tesis
		doc.y = 0;
		doc.moveDown(15.5);
		doc.x = 150;
		doc.font('NotoSans-Bold').text(`${thesis.titulo}`);

		doc.flushPages();
		doc.end();

		writeStream.on('finish', async () => {
			const fileContent = readFileSync(localFilename);

			if (DATA_SOURCES.UPLOAD_S3) {
				const params: PutObjectCommandInput = {
					Bucket: DATA_SOURCES.AWS_BUCKET_NAME,
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

export const createPrintReport = async ({ body }: Request, res: Response) => {
	try {
		const { idStudent, title, idReview, filename } = body;

		const [student] = await Promise.all([
			sqlSelectOne({
				table: 'usuario',
				columns: ['carnet', 'nombre', 'apellidos'],
				query: { id_usuario: idStudent },
			}),
		]);

		const localFilename: string = 'src/storage/report.pdf';

		const doc = createDocument();

		let writeStream = createWriteStream(localFilename);
		doc.pipe(writeStream);

		setLetterHead(doc);

		doc.moveDown(3);

		doc.text(
			`Decanatura de la Facultad de Ciencias Jurídicas y Sociales de la Universidad de San Carlos de Guatemala. Ciudad de Guatemala ${formatDate(
				{ date: new Date(), format: 'report', type: 'date' }
			)}`
		);

		doc.moveDown(3);

		doc.text(
			`Con vista en los dictámenes que anteceden, se autoriza la impresión del trabajo de tesis del estudiante `,
			{
				lineGap: 2,
				continued: true,
			}
		);

		let fullnameStudent: string = `${student?.nombre ?? ''} ${
			student?.apellidos ?? ''
		}`;
		doc.font('Helvetica-Bold');
		doc.text(fullnameStudent.toUpperCase(), {
			lineGap: 2,
			continued: true,
		});

		doc.font('NotoSans');
		doc.text(' titulado ', {
			lineGap: 2,
			continued: true,
		});

		doc.font('Helvetica-Bold');
		doc.text(title.toUpperCase(), {
			lineGap: 2,
			continued: true,
		});

		doc.font('NotoSans');
		doc.text(
			`. Artículos 31, 33 y 34 del Normativo para la Elaboración de Tesis de Licenciaturas en Ciencias Jurídicas y Sociales y del Exámen General Público.`,
			{
				lineGap: 2,
			}
		);

		await setQRCode(doc, idReview);

		setFooter(doc);

		doc.flushPages();
		doc.end();

		writeStream.on('finish', async () => {
			const fileContent = readFileSync(localFilename);

			if (DATA_SOURCES.UPLOAD_S3) {
				const params: PutObjectCommandInput = {
					Bucket: DATA_SOURCES.AWS_BUCKET_NAME,
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
