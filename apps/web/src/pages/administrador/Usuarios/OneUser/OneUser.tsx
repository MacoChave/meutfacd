'use client';
import React from 'react';
import { useLocation } from 'react-router-dom';

export type OneUserProps = {
	// types...
};

const OneUser: React.FC<OneUserProps> = ({}) => {
	const location = useLocation();
	const user = location.state as any;

	console.log('user', user);

	return <div>OneUser works!</div>;
};

export default OneUser;
