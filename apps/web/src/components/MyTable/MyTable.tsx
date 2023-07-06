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
	onEdit,
	onDelete,
	onPrint,
}) => {
	return (
		<Card>
			<Box
				sx={{
					maxWidth: '100%',
					maxHeight: '70vh',
					overflow: 'auth',
				}}
				className='no-scrollbar'>
				<Table stickyHeader>
					<MyHeaders
						headers={headers}
						hasActions={
							onDelete !== undefined ||
							onEdit !== undefined ||
							onPrint !== undefined
						}
					/>
					<MyBody
						headers={headers}
						rows={rows}
						onEdit={onEdit}
						onDelete={onDelete}
						onPrint={onPrint}
					/>
					<MyFooter
						headers={headers}
						rows={rows}
						totalCols={totalCols}
					/>
				</Table>
			</Box>
		</Card>
	);
};

export default MyTable;
