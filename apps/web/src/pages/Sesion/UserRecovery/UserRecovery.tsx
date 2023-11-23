import { URL } from '@/consts/Api';
import { TResult } from '@/models/Fetching';
import { TRecovery, recoveryDefault, schemaRecovery } from '@/models/Recuperar';
import { putData } from '@/services/fetching';
import { yupResolver } from '@hookform/resolvers/yup';
import {
	Box,
	Button,
	Card,
	TextField,
	Toolbar,
	Typography,
} from '@mui/material';
import React, { lazy } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import swal from 'sweetalert';
const ToolbarWithoutSesion = lazy(
	() =>
		import(
			'@/components/Layout/ToolbarWithoutSession/ToolbarWithoutSession'
		)
);

export type UserRecoveryProps = Record<string, never>;

const UserRecovery: React.FC<UserRecoveryProps> = ({}) => {
	const navigate = useNavigate();
	const { email } = useParams();

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<TRecovery>({
		defaultValues: recoveryDefault,
		mode: 'onBlur',
		resolver: yupResolver(schemaRecovery),
	});

	const onSubmit: SubmitHandler<TRecovery> = async (data) => {
		const result: TResult = await putData<TResult>({
			path: URL.AUTH.RECOVERY,
			body: { pass: data.pass },
			params: { email },
		});
		if (result.affectedRows) {
			swal({
				icon: 'success',
				text: 'La contraseña fue actualizaa con éxito',
				title: '¡Bien!',
			});
		}
	};

	return (
		<>
			<ToolbarWithoutSesion />
			<Box component={'main'} sx={{ p: 3 }}>
				<Toolbar />
				<Box
					sx={{
						width: {
							xs: '90vw',
							sm: '70vw',
							md: '50vw',
							lg: '40vw',
							xl: '30vw',
						},
						height: 'auto',
						mx: 'auto',
					}}>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Card
							sx={{
								display: 'flex',
								flexDirection: 'column',
								gap: 4,
								my: 4,
								p: 4,
							}}>
							<Typography variant='h4'>
								Recuperar contraseña
							</Typography>
							<Controller
								control={control}
								name='pass'
								render={({ field }) => (
									<TextField
										{...field}
										label='Contraseña'
										variant='filled'
										type='password'
										error={!!errors.pass}
										helperText={errors.pass?.message || ''}
									/>
								)}
							/>
							<Controller
								control={control}
								name='confpass'
								render={({ field }) => (
									<TextField
										{...field}
										label='Confirmar contraseña'
										variant='filled'
										type='password'
										error={!!errors.confpass}
										helperText={
											errors.confpass?.message || ''
										}
									/>
								)}
							/>
							<Button type='submit' variant='contained'>
								Recuperar contraseña
							</Button>
						</Card>
					</form>
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-around',
							alignItems: 'center',
						}}>
						<Box sx={{ flex: 1 }} />
					</Box>
				</Box>
			</Box>
		</>
	);
};

export default UserRecovery;
