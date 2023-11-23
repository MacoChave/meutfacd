import { URL } from '@/consts/Api';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import {
	APROBADO,
	ESPERA,
	ESTACIONES,
	PENDIENTE,
	PREVIA,
	REVISION,
} from '@/consts/Vars';
import { CitasSchema, TCitas } from '@/models/Citas';
import { TResult } from '@/models/Fetching';
import { TypeWithKey } from '@/models/TypeWithKey';
import { postData, putData } from '@/services/fetching';
import { formatToInputDate } from '@/utils/formatHandler';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Card, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import swal from 'sweetalert';

export type CitaProps = {
	userProgress: any;
	estacion?: number;
	onClose: () => void;
};

const Cita: React.FC<CitaProps> = ({ userProgress, estacion = 6, onClose }) => {
	const [loading, setLoading] = useState(false);
	const { control, handleSubmit } = useForm<TCitas>({
		defaultValues: {
			fecha: formatToInputDate(
				new Date().toLocaleString('es-GT', {
					timeZone: 'America/Guatemala',
				}),
				true
			),
			detalle: '',
			sala: '',
		},
		mode: 'onBlur',
		resolver: yupResolver(CitasSchema),
	});

	const onValid: SubmitHandler<TCitas> = async (data) => {
		setLoading(true);
		let putBody: TypeWithKey<any> = {
			estado: userProgress.estado === PENDIENTE ? REVISION : PREVIA,
			estacion: estacion,
		};
		let postBody: TypeWithKey<any> = {
			fecha: data.fecha,
			detalle: data.detalle,
			sala: data.sala,
			id_tutor: userProgress?.id_tutor ?? 0,
			id_tesis: userProgress.id_tesis,
		};

		if (userProgress.estado === PENDIENTE) {
			putBody = { ...putBody, ...postBody };
		}

		if (userProgress.estado === REVISION) {
			await postData<TResult>({
				path: URL.REVIEW,
				body: { ...putBody, ...postBody },
			});
		}

		Promise.all([
			putData<TResult>({
				path: URL.REVIEW,
				body: putBody,
				params: { id_revision: userProgress.id_revision },
			}),
			postData<TResult>({
				path: URL.NOTIFICATION,
				body: {
					id_receptor: userProgress.id_usuario,
					mensaje: `Se ha agendado una cita para la revisión de la tesis ${userProgress.titulo}`,
					action: 'comentado',
				},
			}),
		])
			.then(([res1, res2]) => {
				if (res1.affectedRows) {
					swal('¡Listo!', 'Se ha agendado la cita', 'success');
				}
				onClose();
			})
			.finally(() => setLoading(false));
	};

	const onPass = async () => {
		setLoading(true);
		const dictamen = await postData<any>({
			path: `${URL.PDF}/${estacion === 6 ? 'dictamen' : 'impresion'}`,
			body: {
				idStudent: userProgress.id_usuario,
				title: userProgress.titulo,
				idReview: userProgress.id_revision,
				currentStation: ESTACIONES[estacion - 1].toLowerCase(),
				nextStation: ESTACIONES[estacion].toLowerCase(),
				filename:
					estacion === 6
						? 'dictamen_prev_internos'
						: 'dictamen_impresion',
			},
		});

		Promise.all([
			putData<TResult>({
				path: `${URL.REVIEW}`,
				body: {
					estado: APROBADO,
					ruta_dictamen: dictamen.name ?? '',
				},
				params: { id_revision: userProgress.id_revision },
			}),
			postData<TResult>({
				path: `${URL.REVIEW}`,
				body: {
					id_tesis: userProgress.id_tesis,
					estacion: estacion + 1,
					estado: PENDIENTE,
				},
				params: {},
			}),
			postData<TResult>({
				path: `${URL.NOTIFICATION}`,
				body: {
					id_receptor: userProgress.id_usuario,
					mensaje: `La revisión de la tesis ${userProgress.titulo} fue aprobada por el encargado de revisión`,
					action: 'aprobado',
				},
				params: {},
			}),
		])
			.then(([putReview, postReview, postNotify]) => {
				if (putReview.affectedRows) {
					swal(
						'¡Bien hecho!',
						'Se ha registrado el avance a la siguiente fase del estudiante',
						'success'
					);
				}
				onClose();
			})
			.catch(() => {
				swal(
					'¡Error!',
					'No se ha podido registrar el avance del estudiante',
					'error'
				);
			})
			.finally(() => setLoading(false));
	};

	return (
		<form onSubmit={handleSubmit(onValid)}>
			<Card
				sx={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
					placeItems: 'center',
					p: 4,
					gap: 4,
				}}>
				<Controller
					control={control}
					name='fecha'
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							sx={{ width: '250px' }}
							type='datetime-local'
							label='Fecha'
							variant='standard'
							error={!!errors.fecha}
							helperText={errors?.fecha?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name='sala'
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							sx={{ width: '250px' }}
							label='Sala'
							variant='standard'
							multiline
							error={!!errors.sala}
							helperText={errors?.sala?.message}
						/>
					)}
				/>
				<Controller
					control={control}
					name='detalle'
					render={({ field, formState: { errors } }) => (
						<TextField
							{...field}
							sx={{ width: '250px' }}
							label='Detalle'
							variant='standard'
							multiline
							error={!!errors.detalle}
							helperText={errors?.detalle?.message}
						/>
					)}
				/>
				<Button variant='contained' color='primary' type='submit'>
					Asignar cita
				</Button>
				<Button
					variant='contained'
					color='primary'
					type='button'
					onClick={onPass}>
					Aprobar
				</Button>
			</Card>
			{loading && <DotsLoaders />}
		</form>
	);
};

export default Cita;
