import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import React, { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import derechoLogo from '@/assets/svg/logo_derecho_white.svg';

export type ToolbarWithoutSessionProps = {
	children?: ReactNode;
};

const ToolbarWithoutSession: React.FC<ToolbarWithoutSessionProps> = ({
	children,
}) => {
	const navigate = useNavigate();

	const goToHome = () => {
		navigate('/');
	};

	return (
		<AppBar
			// position='fixed'
			color='primary'
			sx={{
				gridArea: 'header',
				zIndex: (theme) => theme.zIndex.drawer + 1,
			}}>
			<Toolbar
				sx={{
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'space-around',
				}}>
				<img
					src={derechoLogo}
					style={{
						height: '3rem',
						marginRight: '1em',
					}}
					alt='Facultad de Ciencias Jurídicas y Sociales'
					loading='lazy'
				/>
				<Typography
					component='div'
					sx={{
						cursor: 'pointer',
						display: { xs: 'none', sm: 'block' },
					}}
					onClick={() => goToHome()}>
					Unidad de tesis
				</Typography>
				<Box sx={{ flexGrow: 1 }} />
				{children}
			</Toolbar>
		</AppBar>
	);
};

export default ToolbarWithoutSession;
