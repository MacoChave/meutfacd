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
	onView?: (row: object) => void;
	onDelete?: (row: object) => void;
	onPrint?: (row: object) => void;
	onPass?: (row: object) => void;
	onFail?: (row: object) => void;
};

const McTable: React.FC<McTableProps> = ({
	rows,
	headers,
	totalCols,
	onEdit = undefined,
	onView = undefined,
	onDelete = undefined,
	onPrint = undefined,
	onPass = undefined,
	onFail = undefined,
}) => {
	return (
		<Box
			sx={{
				mx: 'auto',
				overflowX: 'scroll',
				scrollbarWidth: 'none',
			}}>
			<Table>
				<McHeaders headers={headers} />
				<McBody
					headers={headers}
					rows={rows}
					onEdit={onEdit}
					onView={onView}
					onDelete={onDelete}
					onPrint={onPrint}
					onPass={onPass}
					onFail={onFail}
				/>
				<McFooter headers={headers} rows={rows} totalCols={totalCols} />
			</Table>
		</Box>
	);
};

export default McTable;
