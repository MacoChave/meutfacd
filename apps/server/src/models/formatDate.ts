export type TFormatDate = {
	date: Date;
	format: 'mysql' | 'iso' | 'report';
	type: 'date' | 'datetime' | 'time';
};

export type TDateFormatted = {
	date: Date;
	dateStyle?: 'short' | 'medium' | 'long' | 'full' | undefined;
	timeStyle?: 'short' | 'medium' | 'long' | 'full' | undefined;
	timezone?: string;
	style?: string;
};
