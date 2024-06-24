'use client';
import { FileChooser } from '@/components';
import { Box, Button } from '@mui/material';
import React, { CSSProperties, useState } from 'react';

export type UploadCSVProps = {
	id_rol: number;
	style?: CSSProperties;
};

const UploadCSV: React.FC<UploadCSVProps> = ({ id_rol, style }) => {
	const [currentFile, setCurrentFile] = useState<File>();

	const handleUpload = (file: File) => {
		setCurrentFile(file);
		console.log('Archivo subido', file);
	};

	const onSubmit = () => {
		console.log('Subir CSV', currentFile);
	};

	return (
		<Box sx={{ display: 'grid', gap: 2, ...style }}>
			<FileChooser
				onUpload={handleUpload}
				title='CSV de usuarios'
				accept={[
					'.csv',
					'.xls',
					'.xlsx',
					'application/vnd.ms-excel',
					'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				]}
			/>
			<Button
				variant='contained'
				color='primary'
				sx={{ width: '100%' }}
				onClick={onSubmit}>
				Subir archivo
			</Button>
		</Box>
	);
};

export default UploadCSV;
