'use client';
import { DotsLoaders, McTable } from '@/components';
import { URL } from '@/consts/Api';
import { useInfiniteFetch } from '@/hooks/useFetch';
import { Button, Typography } from '@mui/material';
import React from 'react';

export type FetchUsersProps = {
	filter: string;
	onEdit: (registro: object) => void;
	onDelete: (registro: any) => void;
};

const FetchUsers: React.FC<FetchUsersProps> = ({
	filter,
	onEdit,
	onDelete,
}) => {
	const { data, isLoading, error, fetchNextPage, hasNextPage } =
		useInfiniteFetch({
			name: 'users',
			url: `${URL.USER}/allORM`,
			take: 10,
			skip: 0,
			q: filter,
		});

	if (isLoading) return <DotsLoaders />;
	if (error) return <div>Error en obtener los datos</div>;

	return (
		<>
			<McTable
				headers={{
					carnet: 'Carnet',
					nombre: 'Nombres',
					apellidos: 'Apellidos',
					correo: 'Correo',
					estado: 'Estado',
				}}
				rows={data?.pages.flatMap((page) => page.message.data) ?? []}
				totalCols={{}}
				onEdit={onEdit}
			/>
			{hasNextPage ? (
				<Button onClick={() => fetchNextPage()}>Cargar más</Button>
			) : (
				<Typography>No hay más registros</Typography>
			)}
		</>
	);
};

export default FetchUsers;
