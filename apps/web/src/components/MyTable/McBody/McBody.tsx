import {
	formatByDataType,
	getAlignByDataType,
	getChipColor,
	getChipLabel,
} from '@/utils/formatHandler';
import {
	Cancel,
	CancelOutlined,
	Check,
	Delete,
	Edit,
	FileOpen,
	FilePresent,
	Print,
	UnfoldLess,
	UnfoldMore,
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
	onPass?: (row: object) => void;
	onFail?: (row: object) => void;
};

export const getValue = (key: string, cellValue: any): React.ReactNode => {
	if (key === 'estado') {
		return (
			<Chip
				color={getChipColor(cellValue)}
				label={getChipLabel(cellValue)}
			/>
		);
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
	onPass,
	onFail,
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
						{onPass && (
							<IconButton
								color='primary'
								onClick={() => onPass(row)}>
								<Check />
							</IconButton>
						)}
						{onFail && (
							<IconButton
								color='warning'
								onClick={() => onFail(row)}>
								<CancelOutlined />
							</IconButton>
						)}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default McBody;
