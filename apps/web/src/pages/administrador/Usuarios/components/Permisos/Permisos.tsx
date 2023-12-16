import { Box, Typography } from '@mui/material';
import React from 'react';
import { TabsProps } from '../../propTypes/tabsProps';
import { useFetch } from '@/hooks/useFetch';
import { URL } from '@/consts/Api';
import { DotsLoaders } from '@/components';

const Permisos: React.FC<TabsProps> = ({ usuario, index, ...other }) => {
	const { data, isLoading, isError } = useFetch({
		url: `${URL.PERMISSION}/all`,
		params: { id_usuario: usuario.id_usuario },
	});

	if (isLoading) return <DotsLoaders />;
	if (isError) return <div>Error</div>;

	return (
		<>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					width: { xs: '150px', sm: '300px', md: '400px' },
					gap: 2,
					p: 3,
				}}>
				{Object.entries(
					data.reduce((acc: any, item: any) => {
						if (acc[item.n_padre]) acc[item.n_padre] = [];
						acc[item.n_padre].push(item);
						return acc;
					})
				).map(([key, value]: any) => (
					<Box key={key}>
						<Typography variant='h6'>{key}</Typography>
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 1,
							}}>
							{value.map((item: any) => (
								<Typography
									key={item.id_permiso}
									variant='body1'>
									{item.n_permiso}
								</Typography>
							))}
						</Box>
					</Box>
				))}
			</Box>
		</>
	);
};

export default Permisos;
