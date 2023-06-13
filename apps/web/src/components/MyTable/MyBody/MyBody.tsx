import { formatByDataType, getAlignByDataType } from '@/utils/formatHandler';
import { Delete, Edit, Print } from '@mui/icons-material';
import { IconButton, TableBody, TableCell, TableRow } from '@mui/material';
import React from 'react';

export type MyBodyProps = {
	headers: object;
	rows: object[];
	onEdit?: (row: object) => void;
	onDelete?: (row: object) => void;
	onPrint?: (row: object) => void;
};

const MyBody: React.FC<MyBodyProps> = ({
	headers,
	rows,
	onEdit,
	onDelete,
	onPrint,
}) => {
	return (
		<TableBody>
			{rows.map((row, index) => (
				<TableRow key={`row-${index}`}>
					{Object.keys(headers).map((key) => (
						<TableCell
							key={`cell-${key}${index}`}
							align={getAlignByDataType(key)}>
							{formatByDataType({
								[key]: row[key as keyof typeof row],
							})}
						</TableCell>
					))}
					<TableCell>
						{onEdit && (
							<IconButton
								color='primary'
								onClick={() => onEdit(row)}>
								<Edit />
							</IconButton>
						)}
						{onDelete && (
							<IconButton
								color='primary'
								onClick={() => onDelete(row)}>
								<Delete />
							</IconButton>
						)}
						{onPrint && (
							<IconButton
								color='primary'
								onClick={() => onPrint(row)}>
								<Print />
							</IconButton>
						)}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default MyBody;
