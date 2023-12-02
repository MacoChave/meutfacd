'use client';
import React, { ReactNode } from 'react';

export type UploadsReviewProps = {
	children: ReactNode | ReactNode[];
};

const UploadsReview: React.FC<UploadsReviewProps> = ({ children }) => {
	return <div>UploadsReview works!</div>;
};

export default UploadsReview;
