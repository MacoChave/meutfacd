import { Response } from 'express';
import PDFDocument from 'pdfkit';

export const writehead = (name: string, res: Response) => {
	const filename = `${name}_${new Date().toLocaleDateString('es-GT')}.pdf`;

	return res.writeHead(200, {
		'Content-Type': 'application/pdf',
		'Content-Disposition': `attachment; filename=${filename}`,
	});
};

export const createDocument = () => {
	const doc = new PDFDocument({
		size: 'letter',
		layout: 'portrait',
		margins: {
			top: 72,
			bottom: 72,
			left: 72,
			right: 72,
		},
		font: 'Helvetica',
		bufferPages: true,
	});
	return doc;
};

export const setLetterHead = async (
	doc: any,
	user: string = 'Lic. Juan Carlos Pérez',
	status: string = 'Jefe de Estación'
) => {
	doc.fontSize(12).text(
		new Date().toLocaleDateString('es-GT', { dateStyle: 'full' }),
		{
			align: 'right',
			linegap: 2,
		}
	);
	doc.fontSize(12)
		.moveDown(3)
		.text(user.toUpperCase(), { align: 'left', linegap: 2 });
	doc.fontSize(12).text(status.toUpperCase(), { align: 'left', linegap: 2 });
	doc.fontSize(12).text('FACULTAD DE CIENCIAS JURIDICAS Y SOCIALES', {
		align: 'left',
		linegap: 2,
	});
	doc.fontSize(12).text('UNIVERSIDAD DE SAN CARLOS DE GUATEMALA', {
		align: 'left',
		linegap: 2,
	});
};
