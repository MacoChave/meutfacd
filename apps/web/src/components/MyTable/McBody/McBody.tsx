import { ESTACIONES } from '@/consts/Vars';
import {
	formatByDataType,
	getAlignByDataType,
	getChipColor,
	getChipLabel,
} from '@/utils/formatHandler';
import {
	CancelOutlined,
	Check,
	Delete,
	Edit,
	FilePresent,
	Print,
} from '@mui/icons-material';
import {
	Chip,
	IconButton,
	TableBody,
	TableCell,
	TableRow,
	Tooltip,
	Typography,
} from '@mui/material';
import React from 'react';
import { McTableAction } from '../McTable';
import { getNestedValue } from '@/utils/dataManagement';

export type McBodyProps = {
	headers: object;
	rows: object[];
	actions?: McTableAction[];
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
	} else if (key === 'estacion') {
		return <>{ESTACIONES[cellValue - 1]}</>;
	} else {
		const text = formatByDataType({ [key]: cellValue });
		return (
			<Typography
				sx={{
					textOverflow: 'ellipsis',
				}}>
				{!text
					? ''
					: text.length > 40
					? text.slice(0, 40) + '...'
					: text}
			</Typography>
		);
	}
};

const McBody: React.FC<McBodyProps> = ({ headers, rows, actions = [] }) => {
	return (
		<TableBody>
			{rows.map((row, index) => (
				<TableRow key={`row-${index}`}>
					{Object.keys(headers).map((key) => {
						const cellValue = getNestedValue(row, key);
						return (
							<TableCell
								key={`cell-${key}${index}`}
								align={getAlignByDataType(key)}>
								{getValue(key, cellValue)}
								{/* {getValue(key, row[key as keyof typeof row])} */}
							</TableCell>
						);
					})}
					<TableCell>
						{actions.map((action: McTableAction, index: number) => (
							<Tooltip key={index} title={action.tooltip}>
								<IconButton onClick={() => action.onClick(row)}>
									{action.icon}
								</IconButton>
							</Tooltip>
						))}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
};

export default McBody;
