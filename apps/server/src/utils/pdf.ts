import { join } from 'path';
import PDFDocument from 'pdfkit';
import { toDataURL } from 'qrcode';
import { DATA_SOURCES } from '../config/vars.config';
import {
	TContentDictamen,
	TDestinyAddress,
	TInfoSignature,
} from '../models/pdf';
import { formatDate } from './formats';

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
	let imagePath = join(__dirname, '/../storage/PDFHeader.png');
	imagePath = imagePath.replace('/dist', '');
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
	let info: string = station.includes('Curso') ? 'el curso' : station.includes('Nombramiento') ? 'el nombramiento de asesor' : 'la tesis';
	doc.moveDown();
	doc.fontSize(12).text(
		`Respetuosamente a usted informo que procedí a revisar ${info} del bachiller `,
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

	if (!(station.includes('Curso') || station.includes('Nombramiento'))) {
		doc.font('Helvetica');
		doc.fontSize(12).text(` la cual se titula `, {
			align: 'left',
			lineGap: 2,
			continued: true,
		});
	
		doc.font('Helvetica-Bold');
		doc.fontSize(12).text(`"${title}"`.toUpperCase(), {
			align: 'left',
			lineGap: 2,
		});
	} else {
		doc.text(`.`, { align: 'left', lineGap: 2 })
	}

	let detail: string = station.includes('Curso') ? 'Evalué al bachiller en el curso' : station.includes('Nombramiento') ? 'Revisé el nombramiento de asesor del bachiller' : 'Le recomendé al bachiller algunos cambios en la forma, estilo, gramática y redacción de la tesis';
	doc.font('Helvetica');
	doc.moveDown();
	doc.fontSize(12).text(
		`${detail}, por lo que habiendo cumplido con los mismos emito `,
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
		align: 'center',
		lineGap: 2,
	});
	doc.fontSize(12).text(rol.toUpperCase(), {
		align: 'center',
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
	let imagePath = join(__dirname, '/../storage/PDFFooter.png');
	imagePath = imagePath.replace('/dist', '');
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

export const formatStationName = (station: string) => {
	if (station.includes('Curso 1')) return station.replace('1', 'I');
	if (station.includes('Curso 2')) return station.replace('2', 'II');
	return station;
};
