import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

export type MyHeadersProps = {
	headers: object;
	hasActions: boolean;
};

const MyHeaders: React.FC<MyHeadersProps> = ({
	headers,
	hasActions = false,
}) => {
	return (
		<TableHead>
			<TableRow>
				{Object.entries(headers).map(([key, value]) => (
					<TableCell key={key}>{value}</TableCell>
				))}
				{hasActions && <TableCell>Acciones</TableCell>}
			</TableRow>
		</TableHead>
	);
};

export default MyHeaders;
