import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';

const Tabla = ({ data }: { data: Object[] }) => {
	const headers: string[] = Object.keys(data[0]);
	return (
		<>
			<Table>
				<TableHead>
					<TableRow>
						{headers.map((header: string) => (
							<TableCell key={header}>{header}</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{data.map((row: any) => (
						<TableRow
							key={row.id}
							sx={{
								'&:last-child td, &:last-child th': {
									border: 0,
								},
							}}>
							<TableCell>{row.nombre}</TableCell>
							<TableCell>{row.apellido}</TableCell>
							<TableCell>{row.edad}</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
};

export default Tabla;
