import {
	formatByDataType,
	getAlignByDataType,
	getChipLabel,
} from '@/utils/formatHandler';
import {
	Delete,
	Edit,
	FileOpen,
	FilePresent,
	Print,
} from '@mui/icons-material';
import {
	Chip,
	IconButton,
	TableBody,
	TableCell,
	TableRow,
} from '@mui/material';
import React from 'react';

export type McBodyProps = {
	headers: object;
	rows: object[];
	onEdit?: (row: object) => void;
	onView?: (row: object) => void;
	onDelete?: (row: object) => void;
	onPrint?: (row: object) => void;
};

export const getValue = (key: string, cellValue: any): React.ReactNode => {
	if (key === 'estado') {
		return <Chip color='primary' label={getChipLabel(cellValue)} />;
	} else {
		const text = formatByDataType({ [key]: cellValue });
		return <>{text}</>;
	}
};

const McBody: React.FC<McBodyProps> = ({
	headers,
	rows,
	onEdit,
	onView,
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
							{getValue(key, row[key as keyof typeof row])}
						</TableCell>
					))}
					<TableCell>
						{onEdit && (
							<IconButton
								color='secondary'
								onClick={() => onEdit(row)}>
								<Edit />
							</IconButton>
						)}
						{onView && (
							<IconButton
								color='secondary'
								onClick={() => onView(row)}>
								<FilePresent />
							</IconButton>
						)}
						{onDelete && (
							<IconButton
								color='warning'
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

export default McBody;
