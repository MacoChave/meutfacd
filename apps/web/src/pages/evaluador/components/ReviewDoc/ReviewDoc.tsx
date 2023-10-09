import { URL } from '@/api/server';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { APROBADO, ESPERA, ESTACIONES, PREVIA, RECHAZADO } from '@/consts/vars';
import { TResult } from '@/models/Fetching';
import { postData, putData } from '@/services/fetching';
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import swal from 'sweetalert';

export type ReviewDocProps = {
	station: number;
	curReview: any;
	onClose: () => void;
};

const ReviewDoc: React.FC<ReviewDocProps> = ({
	station,
	curReview,
	onClose,
}) => {
	const [loading, setLoading] = useState(false);
	const [comment, setComment] = useState('');

	const commentEmpty = () => comment === '';

	const onReject = async () => {
		setLoading(true);
		if (commentEmpty()) {
			swal(
				'Error',
				'Debe agregar un comentario para rechazar el documento',
				'error'
			);
			setLoading(false);
			return;
		}
		const result: TResult = await putData({
			path: `${URL.REVIEW}`,
			body: { estado: RECHAZADO, detalle: comment },
			params: { id_revision: curReview.id_revision },
		});
		if (result.affectedRows) {
			swal('Éxito', 'Se rechazó el documento', 'success');
			await postData({
				path: URL.NOTIFICATION,
				body: {
					id_receptor: curReview.tutor,
					mensaje: `El documento ${curReview.titulo} fue rechazado por el evaluador`,
					action: 'rechazado',
				},
			});
			onClose();
		} else {
			swal('Error', 'Ocurrió un error al rechazar el documento', 'error');
		}
		setLoading(false);
	};

	const onPrior = async () => {
		setLoading(true);
		if (commentEmpty()) {
			swal(
				'Error',
				'Debe agregar un comentario para enviar a previo el documento',
				'error'
			);
			setLoading(false);
			return;
		}

		const result: TResult = await putData({
			path: `${URL.REVIEW}`,
			body: { estado: PREVIA, detalle: comment },
			params: { id_revision: curReview.id_revision },
		});

		if (result.affectedRows) {
			swal('Éxito', 'Se envió a previa el documento', 'success');

			Promise.all([
				await postData<TResult>({
					path: URL.NOTIFICATION,
					body: {
						id_emisor: curReview.id_tutor,
						id_receptor: curReview.id_usuario,
						mensaje: `Su punto de tesis ${curReview.titulo} fue enviado a previa por el evaluador ${curReview.tutor}`,
						action: 'comentado',
					},
				}),
			]);
			onClose();
		} else {
			swal('Error', 'No se pudo enviar a previa el documento', 'error');
		}
		setLoading(false);
	};

	const onApprove = async () => {
		setLoading(false);
		const dictamen = await postData<any>({
			path: `${URL.PDF}/dictamen`,
			body: {
				idStudent: curReview.id_usuario,
				title: curReview.titulo,
				idReview: curReview.id_revision,
				currentStation: ESTACIONES[station].toLowerCase(),
				nextStation: ESTACIONES[station + 1].toLowerCase(),
			},
		});

		Promise.all([
			putData<TResult>({
				path: URL.REVIEW,
				body: {
					estado: APROBADO,
					detalle: 'Documento aprobado',
					ruta_dictamen: dictamen.name ?? '',
				},
				params: { id_revision: curReview.id_revision },
			}),
			postData<TResult>({
				path: URL.REVIEW,
				body: {
					id_tesis: curReview.id_tesis,
					estacion: 2,
					estado: ESPERA,
				},
			}),
			postData<TResult>({
				path: URL.NOTIFICATION,
				body: {
					id_emisor: curReview.id_tutor,
					id_receptor: curReview.id_usuario,
					mensaje: `Su punto de tesis ${curReview.titulo} fue aprobado por el evaluador ${curReview.tutor}`,
					action: 'aprobado',
				},
			}),
		])
			.then(([putReview, postReview, postNotify]) => {
				if (putReview.warningStatus) {
					swal(
						'Error',
						'No se pudo regitrar el avance del estudiante',
						'success'
					);
				} else if (postReview.warningStatus) {
					swal('Error', 'No se pudo aprobar el documento', 'error');
				} else if (postNotify.warningStatus) {
					swal(
						'Error',
						'No se pudo crear el registro para avanzar a la siguiente etapa',
						'error'
					);
				}
				swal('Éxito', 'Se aprobó el documento', 'success');
				onClose();
			})
			.catch(() => {
				swal('Error', 'No se pudo aprobar el documento', 'error');
			});
		setLoading(false);
	};

	return (
		<>
			<Box
				sx={{
					display: 'grid',
					gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
					gap: 2,
				}}>
				<TextField
					label='Título'
					variant='outlined'
					value={curReview.titulo}
					InputProps={{
						readOnly: true,
						disabled: true,
					}}
				/>
				<TextField
					label='Estudiante'
					variant='outlined'
					value={curReview.nombre}
					InputProps={{
						readOnly: true,
						disabled: true,
					}}
				/>
				<TextField
					label='Comentario'
					variant='outlined'
					value={comment}
					rows={4}
					multiline
					onChange={(e) => setComment(e.target.value)}
				/>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						gap: 2,
					}}>
					<Button variant='contained' onClick={onReject}>
						Rechazar
					</Button>
					<Button variant='contained' onClick={onPrior}>
						Enviar a previo
					</Button>
					<Button variant='contained' onClick={onApprove}>
						Aprobar
					</Button>
				</Box>
			</Box>
			{loading && <DotsLoaders />}
		</>
	);
};

export default ReviewDoc;
