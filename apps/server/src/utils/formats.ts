import { TFormatDate } from '../models/formatDate';

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

export const formatDate = ({ date, format, type }: TFormatDate) => {
	if (format === 'mysql') {
		if (type === 'date') {
			return formatToMySQL(
				switchTimezone(date, {
					dateStyle: 'medium',
					// timeStyle: 'none',
				})
			);
		} else if (type === 'datetime') {
			return formatToMySQL(
				switchTimezone(date, {
					dateStyle: 'medium',
					timeStyle: 'medium',
				})
			);
		} else if (type === 'time') {
			return formatToMySQL(
				switchTimezone(date, {
					// dateStyle: 'none',
					timeStyle: 'medium',
				})
			);
		}
	} else if (format === 'iso') {
		return date.toISOString();
	}
};
