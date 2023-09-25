import { URL } from '@/api/server';
import { ToolbarWithoutSesion } from '@/components';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { SpinLoader } from '@/components/Loader/SpinLoader';
import { setLoading } from '@/redux/states';
import { putData } from '@/services/fetching';
import { Box, Button, Card, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import swal from 'sweetalert';

export type VerifiedEmailProps = {};

const VerifiedEmail: React.FC<VerifiedEmailProps> = ({}) => {
	const [loading, setloading] = useState(false);
	let { email } = useParams();

	const onSubmit = async () => {
		try {
			setLoading(true);
			await putData({
				path: `${URL.AUTH.VERIFY}`,
				params: { email },
			});
			swal(
				'Correo electrónico verificado',
				'Ya puedes iniciar sesión',
				'success'
			);
		} catch (error) {
			swal(
				'Error',
				'No se pudo verificar el correo electrónico',
				'error'
			);
		} finally {
			setLoading(false);
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
							xs: '100%',
							sm: '100%',
							md: '100%',
							lg: '100%',
							xl: '100%',
						},
						m: 'auto',
						height: '100%',
					}}>
					<Card
						sx={{
							display: 'flex',
							flexDirection: 'column',
							p: 4,
							gap: 4,
						}}>
						<Typography variant='h4'>Verificar email</Typography>
						<Typography variant='body1'>
							Correo electrónico: {atob(email as string)}
						</Typography>
						<Button
							variant='contained'
							color='primary'
							onClick={onSubmit}>
							Verificar correo electrónico
						</Button>
					</Card>
				</Box>
			</Box>
			{loading && <SpinLoader />}
		</>
	);
};

export default VerifiedEmail;
