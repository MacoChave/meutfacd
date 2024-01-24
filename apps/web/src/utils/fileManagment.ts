const TBlob: string[] = [
	'aplication/pdf',
	'aplication/zip',
	'aplication/x-rar-compressed',
	'aplication/vnd.openxmlformats-officedocument.wordprocessingml.document',
	'aplication/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
	'aplication/vnd.openxmlformats-officedocument.presentationml.presentation',
	'aplication/vnd.ms-excel',
	'aplication/vnd.ms-powerpoint',
	'aplication/msword',
	'aplication/xls',
	'aplication/xlsx',
	'aplication/doc',
	'aplication/docx',
	'aplication/ppt',
	'aplication/pptx',
	'aplication/pps',
	'aplication/ppsx',
	'aplication/txt',
	'aplication/csv',
	'aplication/rtf',
	'aplication/odt',
	'aplication/ods',
	'aplication/odp',
	'aplication/odg',
	'aplication/odf',
	'aplication/odb',
	'aplication/odc',
	'aplication/odm',
	'aplication/ott',
	'aplication/ots',
	'aplication/otp',
	'aplication/otg',
	'aplication/oth',
	'aplication/otf',
	'aplication/oti',
	'aplication/otc',
	'aplication/otm',
	'aplication/oth',
	'aplication/otf',
	'aplication/oti',
	'aplication/otc',
	'aplication/otm',
	'aplication/ott',
	'aplication/ots',
	'aplication/otp',
	'aplication/otg',
	'aplication/oth',
	'aplication/otf',
	'aplication/oti',
	'aplication/otc',
	'aplication/otm',
	'aplication/oth',
	'aplication/otf',
	'aplication/oti',
	'aplication/otc',
	'aplication/otm',
	'aplication/oth',
	'aplication/otf',
	'aplication/oti',
	'aplication/otc',
	'aplication/otm',
	'aplication/oth',
	'aplication/otf',
];

export const downloadFileByBloodPart = (
	data: BlobPart,
	filename: string,
	type: string = 'aplication/pdf'
) => {
	const url = window.URL.createObjectURL(
		new Blob([data], {
			type,
		})
	);
	const link = document.createElement('a');
	link.href = url;

	link.setAttribute('download', filename);

	// link.download = filename;
	document.body.appendChild(link);
	link.click();
	// document.body.removeChild(link);
	// window.URL.revokeObjectURL(url);

	link.parentNode?.removeChild(link);
};
