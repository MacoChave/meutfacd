export const downloadFileByBloodPart = (data: BlobPart, filename: string) => {
	const url = window.URL.createObjectURL(new Blob([data]));
	const link = document.createElement('a');
	link.href = url;
	link.setAttribute('download', `${filename}`);
	document.body.appendChild(link);
	link.click();
};
