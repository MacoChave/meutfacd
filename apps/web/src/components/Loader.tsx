import { Box, CircularProgress } from '@mui/material';

const style = {
	background: '#1e1e1e1e',
	backdropFilter: 'blur(5px)',
	display: 'flex',
	height: '100vh',
	left: 0,
	position: 'fixed',
	placeContent: 'center',
	placeItems: 'center',
	top: 0,
	width: '100vw',
	zIndex: 1000,
};

const Loader = () => {
	return <Box sx={style}>{/* <CircularProgress color='secondary' /> */}</Box>;
};

export default Loader;
