import { URL } from '@/api/server';
import { ResultType } from '@/models/Result';
import { putData } from '@/services/fetching';
import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import swal from 'sweetalert';

export type ReviewDocProps = {
	curReview: any;
	onClose: () => void;
};

const ReviewDoc: React.FC<ReviewDocProps> = ({ curReview, onClose }) => {
	const [comment, setComment] = useState('');

	const commentEmpty = () => comment === '';

	const onReject = async () => {
		if (commentEmpty()) {
			swal('Error', 'Debe agregar un comentario para rechazar', 'error');
			return;
		}
		const result: ResultType = await putData({
			path: `${URL.REVIEW}`,
			body: { estado: 'R', detalle: comment },
			params: { id_revision: curReview.id_revision },
		});
		if (result.affectedRows) {
			swal('Éxito', 'Se rechazó el documento', 'success');
			onClose();
		} else {
			swal('Error', 'Ocurrió un error al rechazar el documento', 'error');
		}
	};

	const onPrior = async () => {
		if (commentEmpty()) {
			swal('Error', 'Debe agregar un comentario para el previo', 'error');
			return;
		}
		const result: ResultType = await putData({
			path: `${URL.REVIEW}`,
			body: { estado: 'P', detalle: comment },
			params: { id_revision: curReview.id_revision },
		});
		if (result.affectedRows) {
			swal('Éxito', 'Se envió a previa el documento', 'success');
			onClose();
		} else {
			swal('Error', 'No se pudo enviar a previa el documento', 'error');
		}
	};

	const onApprove = async () => {
		const result: ResultType = await putData({
			path: `${URL.REVIEW}`,
			body: { estado: 'A' },
			params: { id_revision: curReview.id_revision },
		});
		if (result.affectedRows) {
			swal('Éxito', 'Se aprobó el documento', 'success');
			onClose();
		} else {
			swal('Error', 'No se pudo aprobar el documento', 'error');
		}
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
		</>
	);
};

export default ReviewDoc;
