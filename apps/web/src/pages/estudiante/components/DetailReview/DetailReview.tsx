'use client';
import { TRevision } from '@/models/TRevision';
import React from 'react';

export type DetailReviewProps = {
	review: TRevision;
	isEditing: boolean;
};

const DetailReview: React.FC<DetailReviewProps> = ({ review, isEditing }) => {
	return <div>DetailReview works!</div>;
};

export default DetailReview;
