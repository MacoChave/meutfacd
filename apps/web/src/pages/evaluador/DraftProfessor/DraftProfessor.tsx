import { URL as URI } from '@/api/server';
import { Contenedor } from '@/components';
import { McTable } from '@/components/MyTable';
import { useCustomFetch } from '@/hooks/useFetch';
import { getData } from '@/services/fetching';
import React from 'react';

export type DraftProfessorProps = Record<string, never>;

const DraftProfessor: React.FC<DraftProfessorProps> = ({}) => {
	const { data, isLoading, isError } = useCustomFetch({
		url: `${URI.REVIEW}/professor`,
		method: 'get',
		body: {},
		params: { estado: 'V', estacion: 1 },
	});

	const openPDF = async (item: any) => {
		const { url }: any = await getData({
			path: `${URI.STORAGE._}`,
			body: {},
			params: { name: item.ruta_perfil },
		});
		console.log(url);
		// const file = new Blob([result], { type: 'application/pdf' });
		// const fileURL = URL.createObjectURL(file);
		window.open(url);
	};

	if (isLoading) return <div>Cargando...</div>;
	if (isError) return <div>Error</div>;

	return (
		<>
			<Contenedor title='Revisar punto de tesis'>
				<McTable
					headers={{
						nombre: 'Estudiante',
						fecha_creacion: 'Inicio',
						fecha_modificacion: 'Modificación',
						fecha: 'Revisión',
					}}
					rows={data}
					totalCols={{}}
					onPrint={openPDF}
				/>
			</Contenedor>
		</>
	);
};

export default DraftProfessor;
