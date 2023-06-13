import { Contenedor } from '@/components';
import { UploadFile } from '@/interfaces/UploadFile';
import { postData } from '@/services/fetching';
import { Box, TextField, Typography } from '@mui/material';
import FileChooser from '../../components/controles/FileChooser';

const style = {
	display: 'grid' as 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: 4,
	minWidth: 250,
	maxWidth: 600,
	mx: 'auto',
};

const Estacion1 = () => {
	const onUpload = async (file: File) => {
		console.log('[Station1.tsx][onUpload]', file);
		const formData = new FormData();
		formData.append('draft', file);
		const data = await postData<UploadFile>({
			path: 'tesis/draft',
			body: formData,
		});
	};

	return (
		<>
			<Contenedor title='Presentar punto de tesis'>
				<Box sx={style}>
					<Box>
						<Typography variant='h6'>Detalle del previo</Typography>
						<Typography>
							{/* Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Enim necessitatibus vero similique voluptatem,
							maiores labore numquam quasi a, molestias expedita
							nesciunt impedit consequatur ducimus ullam doloribus
							officia facilis illum non? */}
						</Typography>
					</Box>
					<Box>
						<TextField
							fullWidth
							label='Descripción del punto de tesis'
							multiline
							placeholder='Descripción del tema'
							variant='filled'
							defaultValue='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis ipsum quidem dolore animi libero tempore deleniti maxime eos adipisci ea in sit distinctio incidunt aperiam, at ullam cupiditate nisi corporis!'
						/>
					</Box>
					<Box
						sx={{
							gridColumnStart: 2,
							gridRow: '1 / span 2',
							p: 2,
							justifySelf: 'center',
							alignSelf: 'center',
						}}>
						<FileChooser onUpload={onUpload} />
					</Box>
				</Box>
			</Contenedor>
		</>
	);
};

export default Estacion1;
