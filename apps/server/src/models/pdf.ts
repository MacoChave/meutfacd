export type TCreateDocument = {
	size?: PDFKit.PDFDocumentOptions['size'];
	layout?: PDFKit.PDFDocumentOptions['layout'];
};

export type TDestinyAddress = {
	doc: PDFKit.PDFDocument;
	fullname: string;
	rol: string;
};

export type TContentDictamen = {
	doc: PDFKit.PDFDocument;
	station: string;
	fullname: string;
	title: string;
	nextStation: string;
};

export type TInfoSignature = {
	doc: PDFKit.PDFDocument;
	fullname: string;
	rol: string;
};
