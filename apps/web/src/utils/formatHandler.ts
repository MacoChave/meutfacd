import {
	APROBADO,
	ESPERA,
	PENDIENTE,
	PREVIA,
	RECHAZADO,
	REVISION,
} from '@/consts/vars';
import { TypeWithKey } from '@/models/TypeWithKey';

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

export const formatByDataType = (cellValue: TypeWithKey<string>): string => {
	const [key, value] = Object.entries(cellValue)[0];
	const dataType = getDataType(key);

	switch (dataType) {
		case 'money':
			return new Intl.NumberFormat('es-GT', {
				style: 'currency',
				currency: 'GTQ',
			}).format(Number(value));
		case 'number':
			return new Intl.NumberFormat().format(Number(value));
		case 'date':
			return new Date(value).toLocaleDateString('es-GT', {
				dateStyle: 'long',
			});
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
