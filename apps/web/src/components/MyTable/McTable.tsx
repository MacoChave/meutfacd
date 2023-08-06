import { Box, Table } from '@mui/material';
import React from 'react';
import { McBody } from './McBody';
import { McFooter } from './McFooter';
import { McHeaders } from './McHeaders';

export type McTableProps = {
	rows: object[];
	headers: object;
	totalCols: object;
	onEdit?: (row: object) => void;
	onDelete?: (row: object) => void;
	onPrint?: (row: object) => void;
};

const McTable: React.FC<McTableProps> = ({
	rows,
	headers,
	totalCols,
	onEdit = undefined,
	onDelete = undefined,
	onPrint = undefined,
}) => {
	return (
		<Box
			sx={{
				mx: 'auto',
				// width: '100%',
				// maxHeight: '100%',
				overflowX: 'scroll',
				scrollbarWidth: 'none',
			}}>
			<Table>
				<McHeaders headers={headers} />
				<McBody
					headers={headers}
					rows={rows}
					onEdit={onEdit}
					onDelete={onDelete}
					onPrint={onPrint}
				/>
				<McFooter headers={headers} rows={rows} totalCols={totalCols} />
			</Table>
		</Box>
	);
};

export default McTable;
