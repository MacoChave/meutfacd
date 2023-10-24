import { Response } from 'express';
import { join } from 'path';
import PDFDocument from 'pdfkit';
import { toDataURL, toString } from 'qrcode';
import { DATA_SOURCES } from '../config/vars.config';

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

export const setHeader = (doc: any) => {
	const imagePath = join(__dirname, '/../storage/PDFHeader.png');
	doc.image(imagePath, 72, 15, {
		fit: [475, 100],
		align: 'center',
		valign: 'center',
	});
};

export const setFooter = (doc: any) => {
	const imagePath = join(__dirname, '/../storage/PDFFooter.png');
	doc.image(imagePath, 72, doc.page.height - 125, {
		fit: [475, 100],
		align: 'center',
		valign: 'center',
	});
};

export const setQRCode = async (doc: any, idReview: number) => {
	let data = `${DATA_SOURCES.URL_FRONTEND}/verify-document/${idReview}`;
	// let stringData = JSON.stringify(data);
	// const result = await toString(stringData, { type: 'terminal' });
	const qrResult = await toDataURL(data);

	doc.image(qrResult, {
		fit: [100, 100],
		align: 'right',
		valign: 'center',
	});
};

export const getNameStation = (station: number) => {
	const stations: string[] = [
		'Punto de tesis',
		'Curso I',
		'Curso II',
		'Comisión y estilo',
		'Previos internos',
	];
	return stations[station + 1];
};
