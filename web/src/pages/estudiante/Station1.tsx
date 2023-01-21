import { Box, Button, Card, TextField, Typography } from '@mui/material';
import { useRef } from 'react';

const style = {
	display: 'grid' as 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: 4,
	minWidth: 250,
	maxWidth: 600,
	mx: 'auto',
};

const Station1 = () => {
	const ref = useRef<HTMLInputElement>();

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		console.log(file);
	};

	return (
		<>
			<Card>
				<Typography
					variant='h4'
					component='h2'
					textAlign='center'
					py={4}>
					Presentar punto de tesis
				</Typography>
				<Box sx={style}>
					<Box>
						<Typography variant='h6'>Detalle del previo</Typography>
						<Typography>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit. Enim necessitatibus vero similique voluptatem,
							maiores labore numquam quasi a, molestias expedita
							nesciunt impedit consequatur ducimus ullam doloribus
							officia facilis illum non?
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
							border: '4px solid darkblue',
							borderRadius: 4,
							display: 'flex',
							flexDirection: 'column',
							placeContent: 'center',
							placeItems: 'center',
							placeSelf: 'stretch',
							gap: 4,
						}}>
						<TextField
							variant='standard'
							InputProps={{ disableUnderline: true }}
							disabled
							label='Selecciona tu archivo'
							sx={{
								'& .MuiFormLabel-root.Mui-disabled': {
									color: 'darkblue',
								},
							}}
						/>
						<Button
							component='label'
							sx={{
								overflow: 'hidden',
							}}>
							Seleccionar
							<input
								ref={ref as any}
								type='file'
								accept='pdf'
								hidden
								onChange={handleChange}
							/>
						</Button>
					</Box>
				</Box>
			</Card>
		</>
	);
};

export default Station1;
