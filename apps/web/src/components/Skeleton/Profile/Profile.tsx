import { Skeleton } from '@mui/material';
import React from 'react';

export type ProfileProps = {};

const Profile: React.FC<ProfileProps> = ({}) => {
	return <Skeleton variant='rectangular' width={210} height={118} />;
};

export default Profile;
