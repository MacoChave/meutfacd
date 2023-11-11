import { TDateFormatted, TFormatDate } from '../models/formatDate';

const switchTimezone = (date: Date, style: Record<string, string>) => {
	return date.toLocaleString('es-GT', {
		timeZone: 'America/Guatemala',
		...style,
		// dateStyle: 'medium',
		// timeStyle: 'medium',
	});
};

const formatToMySQL = (timezoneDate: string) => {
	const [date, time] = timezoneDate.split(', ');
	const [day, month, year] = date.split('/');
	if (!time) return `${year}-${month}-${day}`;

	const [hour, minute, second] = time.split(':');
	return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
};

export const newDate = (strDate: string, lang: 'es' | 'en'): Date => {
	if (lang === 'en') return new Date(strDate);
	const [day, month, year] = strDate.split('/');
	return new Date(`${year}-${month}-${day}`);
};

export const getDateFormatted = ({
	date,
	dateStyle = undefined,
	timeStyle = undefined,
	timezone = 'America/Guatemala',
	style = 'es-GT',
}: TDateFormatted) => {
	return date.toLocaleString(style, {
		timeZone: timezone,
		...(dateStyle ? { dateStyle } : {}),
		...(timeStyle ? { timeStyle } : {}),
	});
};

export const formatDate = ({ date, format, type }: TFormatDate) => {
	if (format === 'mysql') {
		if (type === 'date') {
			return date.toISOString().split('T')[0];
		} else if (type === 'datetime') {
			let strDateTime = getDateFormatted({
				date, dateStyle: 'medium', timeStyle: 'medium', timezone: 'America/Guatemala', style: 'es-GT'
			})
			return formatToMySQL(strDateTime);
		} else if (type === 'time') {
			return date.toISOString().split('T')[1].split('.')[0];
		}
	} else if (format === 'iso') {
		return date.toISOString();
	} else if (format === 'report') {
		return date.toLocaleString('es-GT', {
			dateStyle: 'long',
		});
	}
};
