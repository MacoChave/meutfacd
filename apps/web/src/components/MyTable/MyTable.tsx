import { Box, Card, Table } from '@mui/material';
import React from 'react';
import { MyBody } from './MyBody';
import { MyFooter } from './MyFooter';
import { MyHeaders } from './MyHeaders';

export type MyTableProps = {
	rows: object[];
	headers: object;
	totalCols: object;
	onEdit?: (row: object) => void;
	onDelete?: (row: object) => void;
	onPrint?: (row: object) => void;
};

const MyTable: React.FC<MyTableProps> = ({
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
				<MyHeaders headers={headers} />
				<MyBody
					headers={headers}
					rows={rows}
					onEdit={onEdit}
					onDelete={onDelete}
					onPrint={onPrint}
				/>
				<MyFooter headers={headers} rows={rows} totalCols={totalCols} />
			</Table>
		</Box>
	);
};

export default MyTable;
