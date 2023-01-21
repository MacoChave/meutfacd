import { Box } from '@mui/material';
import { ReactNode, useState } from 'react';
import Appbar from '../components/Appbar';
import Sidebar from '../components/Sidebar';
import { MenuItem } from '../propTypes/Appbar';

const Dashboard = ({
	menuArray,
	children,
}: {
	menuArray: MenuItem[];
	children: ReactNode;
}) => {
	const [open, setOpen] = useState(false);
	return (
		<Box sx={{ display: 'flex' }}>
			<Appbar open={open} setOpen={setOpen} />
			<Sidebar menuArray={menuArray} open={open} setOpen={setOpen} />
			{children}
		</Box>
	);
};

export default Dashboard;
