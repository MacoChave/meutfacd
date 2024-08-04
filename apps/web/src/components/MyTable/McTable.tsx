import { Box, Table } from '@mui/material';
import React from 'react';
import { McBody } from './McBody';
import { McFooter } from './McFooter';
import { McHeaders } from './McHeaders';

export type McTableAction = {
	icon: JSX.Element;
	tooltip: string;
	onClick: (row: object) => void;
};

export type McTableProps = {
	rows: object[];
	headers: object;
	totalCols: object;
	actions?: McTableAction[];
};

const McTable: React.FC<McTableProps> = ({
	rows,
	headers,
	totalCols,
	actions = [],
}) => {
	return (
		<Box
			sx={{
				mx: 'auto',
			}}>
			<Table>
				<McHeaders headers={headers} />
				<McBody headers={headers} rows={rows} actions={actions} />
				<McFooter headers={headers} rows={rows} totalCols={totalCols} />
			</Table>
		</Box>
	);
};

export default McTable;
