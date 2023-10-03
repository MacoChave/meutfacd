import { Request, Response } from 'express';
import { errorHttp } from '../utils/error.handle';
import { createDocument, setFooter, setHeader } from '../utils/pdf';
import { WriteStream, createWriteStream, readFileSync } from 'fs';
import { uploadDictamen } from './storage';
import {
	PutObjectCommand,
	PutObjectCommandInput,
	S3Client,
} from '@aws-sdk/client-s3';
import { config } from '../utils/upload';

export const createReport = async (
	{ body, query, user }: Request,
	res: Response
) => {
	try {
		const { nameEmisor, nameReceiver, thesisTitle, station } = body;

		const filename: string = 'src/assets/images/report.pdf';
		// const stream: any = writehead(nameEmisor, res);
		const doc = createDocument();

		let writeStream = createWriteStream(filename);
		doc.pipe(writeStream);

		await setHeader(doc);

		doc.fontSize(12).moveDown(2).text(`Estimado doctor`, {
			align: 'left',
			lineGap: 2,
		});
		doc.fontSize(12)
			.moveDown()
			.text(
				`Respetuosamente me dirigo a usted informo que procedí a revisar la tesis del bachiller ${nameReceiver.toUpperCase()} la cual se titula "${thesisTitle.toUpperCase()}".`,
				{ align: 'left', lineGap: 2 }
			);
		doc.fontSize(12)
			.moveDown()
			.text(
				`Le recomendé al bachiller algunos cambios en la forma, estilo, gramática y redacción de la tesis, por lo que habiendo cumplido con los mismos emito DICTAMEN FAVORABLE  para que se le otorgue la correspondiente orden de impresión.`,
				{ align: 'left', lineGap: 2 }
			);
		doc.fontSize(12)
			.moveDown()
			.text(`Atentamente.`, { align: 'left', lineGap: 2 });
		doc.fontSize(12).moveDown().text(`${nameEmisor.toUpperCase()}`, {
			align: 'center',
			lineGap: 2,
		});
		doc.fontSize(12).moveDown(4).text(`${station.toUpperCase()}`, {
			align: 'center',
			lineGap: 2,
		});

		setFooter(doc);

		doc.flushPages();
		doc.end();

		writeStream.on('finish', async () => {
			const fileContent = readFileSync(filename);

			const params: PutObjectCommandInput = {
				Bucket: 'ut-src',
				Key: `test/dictamen.pdf`,
				Body: fileContent,
				ACL: 'public-read',
				ContentType: 'application/pdf',
				Metadata: {
					fieldname: 'dictamen',
				},
			};
			const client = new S3Client(config);
			const result = await client.send(new PutObjectCommand(params));
			res.status(200).json(result);
		});
	} catch (error: any) {
		console.log({ error });
		errorHttp(res, error);
	}
};
