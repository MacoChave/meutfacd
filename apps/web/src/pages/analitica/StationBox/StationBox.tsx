import { URL } from '@/consts/Api';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { ESTACIONES } from '@/consts/Vars';
import { useCustomFetch } from '@/hooks/useFetch';
import { Box, Card, Typography } from '@mui/material';
import React from 'react';

export type StationBoxProps = {
	station: number;
};

const StationBox: React.FC<StationBoxProps> = ({ station = 1 }) => {
	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		body: {
			table: 'ut_v_resumen',
		},
		method: 'post',
		params: {
			estacion: station,
		},
	});

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error</Typography>;

	return (
		<>
			{data
				?.sort((a: any, b: any) => a.estacion > b.estacion)
				.map((item: any) => (
					<Card
						key={item.estacion}
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
						<Typography variant='h6'>
							{ESTACIONES[item.estacion - 1]}
						</Typography>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								gap: 1,
							}}>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}>
								<Typography variant='h4'>{item.A}</Typography>
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
								<Typography variant='h4'>{item.P}</Typography>
								<Typography variant='subtitle1'>
									Previos
								</Typography>
							</Box>
							<Box
								sx={{
									display: 'flex',
									flexDirection: 'column',
									alignItems: 'center',
								}}>
								<Typography variant='h4'>{item.R}</Typography>
								<Typography variant='subtitle1'>
									Rechazados
								</Typography>
							</Box>
						</Box>
					</Card>
				))}
		</>
	);
};

export default StationBox;
