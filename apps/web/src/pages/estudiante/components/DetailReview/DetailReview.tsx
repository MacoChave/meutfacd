'use client';
import { TReview } from '@/models/Review';
import React from 'react';

export type DetailReviewProps = {
	review: TReview;
	isEditing: boolean;
};

const DetailReview: React.FC<DetailReviewProps> = ({ review, isEditing }) => {
	return <div>DetailReview works!</div>;
};

export default DetailReview;
