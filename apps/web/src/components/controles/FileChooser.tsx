import { Box, Button, FormLabel, Input, Typography } from '@mui/material';
import { ChangeEvent, DragEvent, useState } from 'react';

interface fileChooserProps {
	title?: string;
	onUpload: (file: File) => void;
}

const FileChooser: React.FC<fileChooserProps> = ({
	title = 'Arrastra tu archivo',
	onUpload,
}) => {
	const [active, setActive] = useState(false);
	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) onUpload(e.target.files[0]);
	};
	const onDragOver = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setActive(true);
	};
	const onDragLeave = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setActive(false);
	};
	const onDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		if (e.dataTransfer.files.length) onUpload(e.dataTransfer.files[0]);
	};

	return (
		<>
			<Box
				sx={{
					backgroundColor: active ? 'lightblue' : 'white',
					border: active
						? '3px solid darkblue'
						: '3px dashed darkblue',
					borderRadius: 4,
					boxSizing: 'border-box',
					display: 'flex',
					flexDirection: 'column',
					gap: 4,
					p: 2,
					placeContent: 'center',
					placeItems: 'center',
					placeSelf: 'stretch',
					width: '100%',
					height: '100%',
				}}
				component='div'
				onDragOver={onDragOver}
				onDragLeave={onDragLeave}
				onDrop={onDrop}>
				<Typography variant='h5'>{title}</Typography>
				<Typography variant='body1'>Arrastra tu archivo</Typography>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						margin: '0.5rem',
					}}>
					<Box
						component='span'
						sx={{
							width: '80px',
							height: '1px',
							background: '#949494',
						}}></Box>
					<Box component='span' mx='1rem'>
						<Typography>O</Typography>
					</Box>
					<Box
						component='span'
						sx={{
							width: '80px',
							height: '1px',
							background: '#949494',
						}}></Box>
				</Box>
				<FormLabel htmlFor='file'>
					<Button variant='contained' component='span'>
						Selecciona tu archivo
					</Button>
				</FormLabel>
				<Input
					type='file'
					name='file'
					id='file'
					style={{ display: 'none' }}
					onChange={onChange}
				/>
			</Box>
		</>
	);
};

export default FileChooser;
