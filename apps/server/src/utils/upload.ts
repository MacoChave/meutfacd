import {
	GetObjectCommand,
	PutObjectCommand,
	PutObjectCommandInput,
	S3Client,
	S3ClientConfig,
} from '@aws-sdk/client-s3';
import { createReadStream } from 'fs';
import { DATA_SOURCES } from '../config/vars.config';

const config: S3ClientConfig = {
	region: DATA_SOURCES.AWS_BUCKET_REGION,
	credentials: {
		accessKeyId: DATA_SOURCES.AWS_PUBLIC_KEY,
		secretAccessKey: DATA_SOURCES.AWS_SECRET_KEY,
	},
};

console.log('config', config);

export const uploadFile = async (
	path: string,
	name: string,
	carnet: string = ''
) => {
	const stream = createReadStream(path);
	const params: PutObjectCommandInput = {
		Bucket: DATA_SOURCES.AWS_BUCKET_NAME,
		Key: `${carnet}_${name}`,
		Body: stream,
		ACL: 'public-read',
		ContentType: 'application/pdf',
		Metadata: {
			fieldname: 'draft',
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
