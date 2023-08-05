import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

export type McHeadersProps = {
	headers: object;
};

const McHeaders: React.FC<McHeadersProps> = ({ headers }) => {
	return (
		<TableHead>
			<TableRow>
				{Object.entries(headers).map(([key, value]) => (
					<TableCell key={key} align='center'>
						{value}
					</TableCell>
				))}
				<TableCell>Acciones</TableCell>
			</TableRow>
		</TableHead>
	);
};

export default McHeaders;
