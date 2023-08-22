import { URL } from '@/api/server';
import { Contenedor } from '@/components';
import { McTable } from '@/components/MyTable';
import { useCustomFetch } from '@/hooks/useFetch';
import { ResultType } from '@/models/Result';
import { putData } from '@/services/fetching';
import { Box } from '@mui/material';
import React from 'react';
import swal from 'sweetalert';

export type PagesAppProps = Record<string, never>;

const PagesApp: React.FC<PagesAppProps> = ({}) => {
	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_pagina',
		},
	});

	const onSave = async (item: any) => {
		const result: ResultType = await putData({
			path: `${URL.GENERIC}`,
			body: {
				table: 'ut_pagina',
				datos: item,
			},
			params: { id_pagina: item.id_pagina },
		});
		console.log(result);
		if (result.affectedRows > 0) {
			swal('Guardado', 'Se ha guardado correctamente', 'success');
			refetch();
		} else {
			swal('Error', 'No se ha podido guardar', 'error');
		}
	};

	const onEdit = (item: any) => {
		console.log('Edit item', item);
	};

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;

	return (
		<>
			<Contenedor title='Gestión de páginas'>
				<McTable
					headers={{
						nombre: 'Nombre',
						descripcion: 'Descripción',
					}}
					rows={data}
					totalCols={{}}
					onEdit={onEdit}
				/>
			</Contenedor>
		</>
	);
};

export default PagesApp;
