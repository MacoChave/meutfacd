import { Request, Response } from 'express';
import { createDocument, setLetterHead, writehead } from '../utils/pdf';
import { errorHttp } from '../utils/error.handle';

export const createCertificate = async (
	{ body, query, user }: Request,
	res: Response
) => {
	try {
		const { nameEmisor, nameReceiver, thesisTitle, station } = body;

		const stream: any = writehead(nameEmisor, res);
		const doc = createDocument();

		doc.on('data', (data) => {
			stream.write(data);
		});
		doc.on('end', () => {
			stream.end();
		});

		await setLetterHead(doc, user.cui);

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

		doc.flushPages();
		doc.end();
	} catch (error: any) {
		errorHttp(res, error);
	}
};
