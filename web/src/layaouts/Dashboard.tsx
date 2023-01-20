import { Box } from '@mui/material';
import { ReactNode, useState } from 'react';
import Appbar from '../components/Appbar';
import Sidebar from '../components/Sidebar';

const Dashboard = ({ children }: { children: ReactNode }) => {
	const [open, setOpen] = useState(true);
	return (
		<Box sx={{ display: 'flex' }}>
			<Appbar open={open} setOpen={setOpen} />
			<Sidebar open={open} setOpen={setOpen} />
			{children}
		</Box>
	);
};

export default Dashboard;
