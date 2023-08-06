import { formatByDataType } from '@/utils/formatHandler';
import { TableCell, TableFooter, TableRow } from '@mui/material';
import React from 'react';

export type McFooterProps = {
	headers: object;
	rows: object[];
	totalCols: object;
};

const McFooter: React.FC<McFooterProps> = ({ headers, rows, totalCols }) => {
	return (
		<TableFooter>
			<TableRow>
				{Object.entries(headers).map(([key, value]) => (
					<TableCell key={`cell-${key}`} align='right'>
						{key in totalCols
							? value +
							  ' : ' +
							  formatByDataType({
									[key]: rows
										.reduce(
											(prev, curr) =>
												+prev +
												+curr[key as keyof typeof curr],
											0
										)
										.toString(),
							  })
							: ''}
					</TableCell>
				))}
			</TableRow>
		</TableFooter>
	);
};

export default McFooter;
