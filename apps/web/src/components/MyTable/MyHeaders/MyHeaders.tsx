import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

export type MyHeadersProps = {
	headers: object;
};

const MyHeaders: React.FC<MyHeadersProps> = ({ headers }) => {
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

export default MyHeaders;
