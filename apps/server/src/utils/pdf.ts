import { Response } from 'express';
import PDFDocument from 'pdfkit-construct';

export const writehead = (name: string, res: Response) => {
	const filename = `${name}_${new Date().toLocaleDateString('es-GT', {
		dateStyle: 'short',
	})}.pdf`;

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
		permissions: {
			annotating: false,
			copying: false,
			modifying: false,
			printing: 'highResolution',
		},
	});
	return doc;
};

export const setHeader = async (doc: any) => {
	// const imagePath = `${__dirname}\\..\\assets\\images\\PDFHeader.png`;
	const imagePath = `./src/assets/images/PDFHeader.png`;
	console.log({ imagePath });
	doc.setDocumentHeader({ height: '15%' }, () => {
		doc.image(imagePath, 50, 40, {
			fit: [500, 100],
			align: 'center',
		});
	});
};

export const setFooter = (doc: any) => {
	doc.setDocumentFooter({ height: '15%' }, () => {
		doc.image(`${__dirname}/../assets/images/PDFFooter.png`, 50, 45, {
			fit: [500, 100],
			align: 'center',
		});
	});
};
