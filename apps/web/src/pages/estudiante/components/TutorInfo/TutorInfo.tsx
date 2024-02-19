'use client';
import React from 'react';

export type TutorInfoProps = {
	tutor: string;
	openChat: () => void;
};

const TutorInfo: React.FC<TutorInfoProps> = ({ tutor, openChat }) => {
	return <div>TutorInfo works!</div>;
};

export default TutorInfo;
