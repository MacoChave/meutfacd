import { URL } from '@/api/server';
import { DotsLoaders } from '@/components/Loader/DotsLoaders';
import { useCustomFetch } from '@/hooks/useFetch';
import { Typography } from '@mui/material';
import React from 'react';
import { useParams } from 'react-router-dom';

export type VerifiedDocumentProps = {};

const VerifiedDocument: React.FC<VerifiedDocumentProps> = ({}) => {
	const params = useParams();
	const { data, isLoading, isError } = useCustomFetch({
		url: `${URL.GENERIC}/public/one`,
		method: 'post',
		body: {
			table: 'ut_v_revision',
		},
		params: {
			id_revision: params['reviewId'],
		},
	});

	if (isLoading) return <DotsLoaders />;
	if (isError) return <Typography>Error</Typography>;

	return (
		<>
			<Typography>VerifiedDocument: {`${params['reviewId']}`}</Typography>
			<Typography>{data}</Typography>
		</>
	);
};

export default VerifiedDocument;
