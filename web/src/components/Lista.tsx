import { List, ListItem, ListItemText } from '@mui/material';

const Lista = ({ data }: { data: Object[] }) => {
	return (
		<>
			<List>
				{data.map((row: any) => (
					<ListItem key={row.id}>
						<ListItemText primary={row.nombre} />
						<ListItemText primary={row.apellido} />
						<ListItemText primary={row.edad} />
					</ListItem>
				))}
			</List>
		</>
	);
};

export default Lista;
