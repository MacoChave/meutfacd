import {
	GetObjectCommand,
	PutObjectCommand,
	PutObjectCommandInput,
	S3Client,
	S3ClientConfig,
} from '@aws-sdk/client-s3';
import { createReadStream } from 'fs';
import { DATA_SOURCES } from '../config/vars.config';

export const config: S3ClientConfig = {
	region: DATA_SOURCES.AWS_BUCKET_REGION,
	credentials: {
		accessKeyId: DATA_SOURCES.AWS_PUBLIC_KEY,
		secretAccessKey: DATA_SOURCES.AWS_SECRET_KEY,
	},
};

export const getExtFile = (name: string): string => {
	return name.split('.').pop() || '';
};

export const getContentTypeByExt = (ext: string): string => {
	switch (ext) {
		case 'pdf':
			return 'application/pdf';
		case 'doc':
			return 'application/msword';
		case 'docx':
			return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
		case 'xls':
			return 'application/vnd.ms-excel';
		case 'xlsx':
			return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
		case 'ppt':
			return 'application/vnd.ms-powerpoint';
		case 'pptx':
			return 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
		default:
			return 'application/pdf';
	}
};

export const uploadFile = async (
	path: string,
	name: string,
	carnet: string = '',
	fieldname: 'preview' | 'thesis' | 'dictamen'
) => {
	const ext = getExtFile(name);
	const stream = createReadStream(path);
	const params: PutObjectCommandInput = {
		Bucket: DATA_SOURCES.AWS_BUCKET_NAME,
		Key: `${carnet}/${fieldname}.${ext}`,
		Body: stream,
		ACL: 'public-read',
		ContentType: getContentTypeByExt(ext),
		Metadata: {
			fieldname: fieldname,
		},
	};
	const client = new S3Client(config);
	return await client.send(new PutObjectCommand(params));
};

export const downloadFile = async (name: string) => {
	const params = {
		Bucket: DATA_SOURCES.AWS_BUCKET_NAME,
		Key: name,
	};
	const client = new S3Client(config);
	return await client.send(new GetObjectCommand(params));
};
