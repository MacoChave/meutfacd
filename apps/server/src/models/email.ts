export type TEmailFromVerification = {
	username: string;
	email: string;
};

export type TEmailFromRecovery = {
	email: string;
};

export type TEmailFromActivity = {
	username: string;
	action: 'creado' | 'aprobado' | 'comentado' | 'rechazado';
	title: string;
	description: string;
};

export type TEmailHTML = {
	body: string;
};

export type TSendEmail = {
	to: string | string[];
	subject: string;
	plainText: string;
	content: string;
};
