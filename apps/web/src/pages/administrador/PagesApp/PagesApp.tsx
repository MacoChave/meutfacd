import { Contenedor, McModal } from '@/components';
import { McTable } from '@/components/MyTable';
import { URL } from '@/consts/Api';
import { useCustomFetch } from '@/hooks/useFetch';
import { TPageApp } from '@/models/PageApp';
import React, { useState } from 'react';
import { FormPagesApp } from './FormPagesApp';

export type PagesAppProps = Record<string, never>;

const PagesApp: React.FC<PagesAppProps> = ({}) => {
	const [editPage, setEditPage] = useState<TPageApp>({} as TPageApp);
	const [editing, setEditing] = useState(false);

	const { data, isLoading, isError, refetch } = useCustomFetch({
		url: `${URL.GENERIC}/all`,
		method: 'post',
		body: {
			table: 'ut_v_pagina',
			sort: { n_padre: 'asc' },
			conditions: [
				{ column: 'n_padre', operator: 'is not', value: 'null' },
			],
		},
	});

	// const onSave = async (item: any) => {
	// 	const result: TResult = await putData({
	// 		path: `${URL.GENERIC}`,
	// 		body: {
	// 			table: 'ut_pagina',
	// 			datos: item,
	// 		},
	// 		params: { id_pagina: item.id_pagina },
	// 	});

	// 	if (result.affectedRows > 0) {
	// 		swal('Guardado', 'Se ha guardado correctamente', 'success');
	// 		refetch();
	// 	} else {
	// 		swal('Error', 'No se ha podido guardar', 'error');
	// 	}
	// };

	const onEdit = (item: any) => {
		setEditPage(item);
		setEditing(true);
	};

	const onClose = () => {
		setEditing(false);
		setEditPage({} as TPageApp);
		refetch();
	};

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;

	return (
		<>
			<Contenedor title='Gestión de páginas'>
				<McTable
					headers={{
						n_padre: 'Categoría',
						n_hijo: 'Nombre',
						descripcion: 'Descripción',
						ruta: 'Ruta de la página',
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
