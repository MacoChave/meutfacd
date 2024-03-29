import {
	APROBADO,
	ESPERA,
	PENDIENTE,
	PREVIA,
	RECHAZADO,
	REVISION,
} from '@/consts/Vars';
import { TypeWithKey } from '@/models/TypeWithKey';
import dayjs, { Dayjs } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import localeData from 'dayjs/plugin/localeData';
import relativeTime from 'dayjs/plugin/relativeTime';
import { DIVISIONS } from '@/consts/Time';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(relativeTime);
dayjs.extend(localeData);

/**
 * Formatea la primera letra de cada palabra a mayúscula
 * @param value Cadena de texto a formatear
 * @returns Cadena de texto formateada
 */
export const stringToCapitalize = (value: string): string => {
	return value.split(' ').reduce((acc, word) => {
		return acc + word.charAt(0).toUpperCase() + word.slice(1) + ' ';
	}, '');
};

export const getChipLabel = (code: string) => {
	switch (code) {
		case PENDIENTE:
			return 'Pendiente';
		case ESPERA:
			return 'En espera';
		case REVISION:
			return 'Revisión';
		case RECHAZADO:
			return 'Rechazado';
		case PREVIA:
			return 'Previo';
		case APROBADO:
			return 'Aprobado';
		default:
			return 'Sin datos';
	}
};

export const getChipColor = (code: string) => {
	switch (code) {
		case PENDIENTE:
			return 'default';
		case ESPERA:
			return 'warning';
		case REVISION:
			return 'primary';
		case RECHAZADO:
			return 'error';
		case PREVIA:
			return 'info';
		case APROBADO:
			return 'success';
		default:
			return 'default';
	}
};

export const getDataType = (key: string): string => {
	if (key.includes('fecha')) return 'date';
	return 'string';
};

export const getAlignByDataType = (
	key: string
): 'right' | 'center' | 'left' | 'justify' | 'inherit' => {
	const dataType = getDataType(key);

	switch (dataType) {
		case 'money':
			return 'right';
		case 'number':
			return 'right';
		case 'date':
			return 'center';
		case 'string':
			return 'left';
		default:
			return 'left';
	}
};

const formatTimeAgo = (date: Date) => {
	let duration = (date - new Date()) / 1000;
	const formatter = new Intl.RelativeTimeFormat('es-GT', {
		style: 'long',
		numeric: 'auto',
	});

	for (const { amount, name } of DIVISIONS) {
		if (Math.abs(duration) < amount) {
			return formatter.format(Math.round(duration), name as any);
		}
		duration /= amount;
	}

	return new Intl.DateTimeFormat('es-GT', {
		dateStyle: 'long',
		timeStyle: 'short',
	}).format(date);
};

export const formatByDataType = (cellValue: TypeWithKey<string>): string => {
	const [key, value] = Object.entries(cellValue)[0];
	const dataType = getDataType(key);
	let date: Dayjs;

	switch (dataType) {
		case 'money':
			return new Intl.NumberFormat('es-GT', {
				style: 'currency',
				currency: 'GTQ',
			}).format(Number(value));
		case 'number':
			return new Intl.NumberFormat().format(Number(value));
		case 'date':
			return formatTimeAgo(new Date(value));
		case 'time':
			date = dayjs(value).locale('es').tz('America/Guatemala');
			return date.format('HH:mm:ss');
		case 'datetime':
			date = dayjs(value).locale('es').tz('America/Guatemala');
			return date.format('DD/MM/YYYY HH:mm:ss');
		case 'boolean':
			return value ? 'Si' : 'No';
		default:
			return value;
	}
};

type TFormatDate = {
	date: Date;
	setDay?: number;
	setHour?: number;
	withTime?: boolean;
	onlyMonth?: boolean;
};

export const formatDate = ({
	date,
	setDay = undefined,
	setHour = undefined,
	withTime = false,
	onlyMonth = false,
}: TFormatDate): string => {
	if (setDay) date.setDate(setDay);
	if (setHour) date.setHours(setHour);

	const res = date.toLocaleString('es-GT', {
		dateStyle: onlyMonth ? 'short' : 'long',
		timeStyle: withTime ? 'medium' : undefined,
		timeZone: 'America/Guatemala',
	});
	return res;
};

export const formatToInputDate = (
	strTimestamp: string,
	includeTime: boolean = false
) => {
	const sepDT = strTimestamp.includes('T');
	const [strDate, strTime] = strTimestamp.split(sepDT ? 'T' : ', ');
	const sepD: boolean = strDate.includes('/');
	const [day, month, year] = strDate.split(sepD ? '/' : '-');
	let stYear = +day > 31 ? day : year;
	let stDay = +day > 31 ? year : day;

	const result = `${stYear}-${month}-${stDay}${
		includeTime ? ` ${strTime.replace('Z', '')}` : ''
	}`;
	return result;
};

export const getInitialsFullname = (fullname: string) => {
	const [firstName, lastName] = fullname.split(' ');
	const firstLetter = firstName?.charAt(0) ?? '';
	const lastLetter = lastName?.charAt(0) ?? '';
	return `${firstLetter}${lastLetter}`;
};

export const getColorAvatar = (avatarName: string) => {
	const colors = [
		'#f44336',
		'#e91e63',
		'#9c27b0',
		'#673ab7',
		'#3f51b5',
		'#2196f3',
		'#03a9f4',
		'#00bcd4',
		'#009688',
		'#4caf50',
		'#8bc34a',
		'#cddc39',
		'#ffeb3b',
		'#ffc107',
		'#ff9800',
		'#ff5722',
		'#795548',
		'#9e9e9e',
		'#607d8b',
	];
	const randomColor = Math.floor(Math.random() * colors.length);
	return colors[randomColor];
};

export const formatStationName = (station: string): string => {
	if (station === 'Curso I') return 'Curso 1';
	if (station === 'Curso II') return 'Curso 2';
	return station;
};
