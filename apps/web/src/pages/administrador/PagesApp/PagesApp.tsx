import { URL } from '@/api/server';
import { Contenedor, McModal } from '@/components';
import { McTable } from '@/components/MyTable';
import { useCustomFetch } from '@/hooks/useFetch';
import { PageAppType } from '@/models/PageApp';
import { ResultType } from '@/models/Result';
import { putData } from '@/services/fetching';
import React, { useState } from 'react';
import swal from 'sweetalert';
import { FormPagesApp } from './FormPagesApp';

export type PagesAppProps = Record<string, never>;

const PagesApp: React.FC<PagesAppProps> = ({}) => {
	const [editPage, setEditPage] = useState<PageAppType>({} as PageAppType);
	const [editing, setEditing] = useState(false);

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

		if (result.affectedRows > 0) {
			swal('Guardado', 'Se ha guardado correctamente', 'success');
			refetch();
		} else {
			swal('Error', 'No se ha podido guardar', 'error');
		}
	};

	const onEdit = (item: any) => {
		setEditPage(item);
		setEditing(true);
	};

	const onClose = () => {
		setEditing(false);
		setEditPage({} as PageAppType);
		refetch();
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
						icono: 'Abr',
					}}
					rows={data}
					totalCols={{}}
					onEdit={onEdit}
				/>
			</Contenedor>
			{editing && (
				<McModal open={editing} onClose={onClose} title='Editar página'>
					<FormPagesApp page={editPage} onClose={onClose} />
				</McModal>
			)}
		</>
	);
};

export default PagesApp;
