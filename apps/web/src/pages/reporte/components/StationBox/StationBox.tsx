import { URL } from '@/consts/Api';
import { ESTACIONES } from '@/consts/Vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { Box, Card, Skeleton, Typography } from '@mui/material';
import React from 'react';
import dayjs from 'dayjs';

export type StationBoxProps = {
	station: number;
	date: string;
};

const StationBox: React.FC<StationBoxProps> = ({ station, date }) => {
	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		body: {
			table: 'ut_v_resumen',
			conditions: [
				{
					column: 'fecha',
					operator: '>=',
					value: dayjs(date).startOf('month').format('YYYY-MM-DD'),
				},
				{
					column: 'fecha',
					operator: '<=',
					value: dayjs(date).endOf('month').format('YYYY-MM-DD'),
				},
			],
			condInclusives: true,
		},
		method: 'post',
		params: {
			estacion: station,
		},
	});

	if (isLoading)
		return (
			<Skeleton
				variant='rectangular'
				width='100%'
				height={200}
				sx={{
					borderRadius: 2,
				}}
			/>
		);
	if (isError) return <Typography>Error</Typography>;

	return (
		<>
			<Card
				key={station - 1}
				sx={{
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 2,
					p: 2,
					bgcolor: 'primary.main',
					color: 'white',
				}}>
				<Typography variant='h6'>{ESTACIONES[station - 1]}</Typography>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'center',
						flexDirection: 'row',
						gap: 1,
					}}>
					{station != 4 ? (
						<>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}>
								<Typography variant='h4'>
									{data[0]?.A ?? '-'}
								</Typography>
								<Typography variant='subtitle1'>
									Aprobados
								</Typography>
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}>
								<Typography variant='h4'>
									{data[0]?.R ?? '-'}
								</Typography>
								<Typography variant='subtitle1'>
									Rechazados
								</Typography>
							</Box>
						</>
					) : (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
							}}>
							<Typography variant='h4'>
								{(data[0]?.A ?? 0) + (data[0]?.R ?? 0)}
							</Typography>
							<Typography variant='subtitle1'>Cambios</Typography>
						</Box>
					)}
				</Box>
			</Card>
		</>
	);
};

export default StationBox;
