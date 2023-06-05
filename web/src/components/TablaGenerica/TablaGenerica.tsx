import { Delete, East, Edit } from '@mui/icons-material';
import {
	Box,
	Card,
	IconButton,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableRow,
} from '@mui/material';
import { PropsWithChildren } from 'react';

export type TablaGenericaProps = {
	registros: object[];
	cabeceras: object;
	sumatoria: object;
	onDelete: (registro: object) => void;
	onEdit: (registro: object) => void;
};

const Estructura = ({ children }: PropsWithChildren) => {
	return (
		<Card>
			<Box
				sx={{
					maxWidth: '100%',
					maxHeight: '70vh',
					overflow: 'auto',
				}}
				className='no-scrollbar'>
				<Table stickyHeader>{children}</Table>
			</Box>
		</Card>
	);
};

const Headers = ({ cabeceras }: { cabeceras: object }) => {
	return (
		<TableHead>
			<TableRow>
				{Object.entries(cabeceras).map(([key, value]) => (
					<TableCell key={key}>{value}</TableCell>
				))}
				<TableCell>Acciones</TableCell>
			</TableRow>
		</TableHead>
	);
};

const Body = ({
	cabeceras,
	registros,
	onDetail,
	onEdit,
}: {
	cabeceras: object;
	registros: object[];
	onDetail: (registro: object) => void;
	onEdit: (registro: object) => void;
}) => {
	return (
		<TableBody>
			{registros.map((registro, index) => (
				<TableRow key={`registro-${index}`}>
					{Object.entries(cabeceras).map(([key, value]) => (
						<TableCell key={`celda-${key}${index}`}>
							{registro[key as keyof typeof registro]}
						</TableCell>
					))}
					<TableCell>
						<IconButton
							color='secondary'
							onClick={() => onEdit(registro)}>
							<Edit />
						</IconButton>
						<IconButton
							color='secondary'
							onClick={() => onDetail(registro)}>
							<East />
						</IconButton>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

const NoBody = ({ celdas }: { celdas: number }) => {
	return (
		<TableBody>
			<TableRow>
				<TableCell colSpan={celdas} sx={{ textAlign: 'center' }}>
					No hay registros
				</TableCell>
			</TableRow>
		</TableBody>
	);
};

const Footer = ({
	cabeceras,
	registros,
	sumatoria,
}: {
	cabeceras: object;
	registros: object[];
	sumatoria: object;
}) => {
	return (
		<TableBody>
			<TableRow>
				{Object.entries(cabeceras).map(([key, value]) => (
					<TableCell key={`celda-${key}`} sx={{ fontWeight: 'bold' }}>
						{key in sumatoria
							? value +
							  ': ' +
							  registros.reduce(
									(prev, curr) =>
										prev + curr[key as keyof typeof curr],
									0
							  )
							: ''}
					</TableCell>
				))}
			</TableRow>
		</TableBody>
	);
};

const TablaGenerica: React.FC<TablaGenericaProps> = ({
	registros,
	cabeceras,
	sumatoria,
	onDelete,
	onEdit,
}) => {
	if (!registros || registros.length === 0) {
		return (
			<Estructura>
				<Headers cabeceras={cabeceras} />
				<NoBody celdas={Object.keys(cabeceras).length} />
			</Estructura>
		);
	}

	return (
		<Estructura>
			<Headers cabeceras={cabeceras} />
			<Body
				cabeceras={cabeceras}
				registros={registros}
				onDetail={onDelete}
				onEdit={onEdit}
			/>
			<Footer
				cabeceras={cabeceras}
				registros={registros}
				sumatoria={sumatoria}
			/>
		</Estructura>
	);
};

export default TablaGenerica;
