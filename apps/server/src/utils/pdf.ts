import { join } from 'path';
import PDFDocument from 'pdfkit';
import { toDataURL } from 'qrcode';
import { DATA_SOURCES } from '../config/vars.config';
import { formatDate } from './formats';
import {
	TContentDictamen,
	TDestinyAddress,
	TInfoSignature,
} from '../models/pdf';

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

export const setLetterHead = (doc: PDFKit.PDFDocument) => {
	const imagePath = join(__dirname, '/../storage/PDFHeader.png');
	doc.image(imagePath, 72, 15, {
		fit: [475, 100],
		align: 'center',
		valign: 'center',
	});
};

export const setCurrentDate = (doc: PDFKit.PDFDocument) => {
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
};

export const setDestinyAddress = ({
	doc,
	fullname = 'Fullname responsible next station',
	rol = 'Rol responsible next station',
}: TDestinyAddress) => {
	doc.fontSize(12).text(fullname.toUpperCase(), {
		align: 'left',
		lineGap: 2,
	});

	doc.fontSize(12).text(rol.toUpperCase(), {
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
};

export const setContentDictamen = ({
	doc,
	fullname,
	title,
	nextStation,
	station,
}: TContentDictamen) => {
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
	doc.fontSize(12).text(fullname.toUpperCase(), {
		align: 'left',
		lineGap: 2,
		continued: true,
	});

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
};

export const setInfoSignature = ({ doc, fullname, rol }: TInfoSignature) => {
	doc.fontSize(12).text(fullname.toUpperCase(), {
		align: 'left',
		lineGap: 2,
	});
	doc.fontSize(12).text(rol.toUpperCase(), {
		align: 'left',
		lineGap: 2,
	});
};

// export const writehead = (name: string, res: Response) => {
// 	const filename = `${name}_${new Date().toLocaleDateString('es-GT', {
// 		dateStyle: 'short',
// 	})}.pdf`;

// 	return res.writeHead(200, {
// 		'Content-Type': 'application/pdf',
// 		'Content-Disposition': `attachment; filename=${filename}`,
// 	});
// };

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
