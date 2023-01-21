import { Add, Remove } from '@mui/icons-material';
import {
	Box,
	Button,
	Card,
	Checkbox,
	IconButton,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	TextField,
	Typography,
} from '@mui/material';
import { useRef, useState } from 'react';

const style = {
	display: 'grid' as 'grid',
	gridTemplateColumns: 'repeat(2, 1fr)',
	gap: 4,
	minWidth: 250,
	maxWidth: 600,
	mx: 'auto',
};

const Asignar = () => {
	const [checked, setChecked] = useState([]);

	const handleToggle = (value: string) => () => {
		// const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		// if (currentIndex === -1) {
		// 	newChecked.push(value);
		// } else {
		// 	newChecked.splice(currentIndex, 1);
		// }

		setChecked(newChecked);
	};

	return (
		<>
			<Card>
				<Typography
					variant='h4'
					component='h2'
					textAlign='center'
					py={4}>
					Elba Esther Gordillo
				</Typography>
				<Typography
					variant='h6'
					component='h2'
					textAlign='center'
					py={4}>
					Asignar evaluador
				</Typography>
				<Box sx={style}>
					<Box sx={{ display: 'flex', gap: 4 }}>
						<TextField
							variant='filled'
							label='Jornada'
							value='Vespertino'
						/>
						<TextField
							variant='filled'
							label='Horario'
							value='15:00 - 16:00'
						/>
					</Box>
					<Box sx={{ display: 'flex', gap: 4 }}>
						<TextField
							variant='filled'
							label='Evaluador'
							value='Raquel Angulo'
						/>
					</Box>
					<Box>
						<Typography variant='h6' component='h3'>
							Listado de estudiantes
						</Typography>
						<List>
							{[
								'Estudiante 1',
								'Estudiante 2',
								'Estudiante 3',
								'Estudiante 4',
							].map((value, index) => {
								const labelId = `checkbox-list-label-${value}`;

								return (
									<ListItem
										key={index}
										secondaryAction={
											<IconButton
												edge='end'
												aria-label='comments'>
												<Add />
											</IconButton>
										}
										disablePadding>
										<ListItemButton
											role={undefined}
											onClick={handleToggle(value)}
											dense>
											<ListItemText
												id={labelId}
												primary={value}
											/>
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
					</Box>
					<Box>
						<Typography variant='h6' component='h3'>
							Estudiantes asignados
						</Typography>
						<List>
							{[
								'Estudiante 5',
								'Estudiante 6',
								'Estudiante 7',
							].map((value, index) => {
								const labelId = `checkbox-list-label-${value}`;

								return (
									<ListItem
										key={index}
										secondaryAction={
											<IconButton
												edge='end'
												aria-label='comments'>
												<Remove />
											</IconButton>
										}
										disablePadding>
										<ListItemButton
											role={undefined}
											onClick={handleToggle(value)}
											dense>
											<ListItemText
												id={labelId}
												primary={value}
											/>
										</ListItemButton>
									</ListItem>
								);
							})}
						</List>
					</Box>
				</Box>
			</Card>
		</>
	);
};

export default Asignar;