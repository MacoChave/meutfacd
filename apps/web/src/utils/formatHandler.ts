import { APROBADO, ESPERA, PREVIA, RECHAZADO, REVISION } from '@/consts/vars';
import { TypeWithKey } from '@/models/TypeWithKey';

export const getChipLabel = (code: string) => {
	switch (code) {
		case ESPERA:
			return 'En espera';
		case APROBADO:
			return 'Aprobado';
		case RECHAZADO:
			return 'Rechazado';
		case PREVIA:
			return 'Previa';
		case REVISION:
			return 'Revisión';
		default:
			return 'Sin datos';
	}
};

export const getChipColor = (code: string) => {
	switch (code) {
		case ESPERA:
			return 'warning';
		case APROBADO:
			return 'success';
		case RECHAZADO:
			return 'error';
		case PREVIA:
			return 'info';
		case REVISION:
			return 'primary';
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
	onlyTime?: boolean;
	onlyMonth?: boolean;
};

export const formatDate = ({
	date,
	setDay,
	setHour,
	onlyTime,
	onlyMonth,
}: TFormatDate): string => {
	if (setDay) date.setDate(setDay);
	if (setHour) date.setHours(setHour);

	const str = date.toLocaleString('es-GT', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		timeZone: 'America/Guatemala',
	});

	return str;
};

export const formatToInputDate = (strDate: string) => {
	const sep: boolean = strDate.includes('/');
	const [day, month, year] = strDate.split(sep ? '/' : '-');

	return `${day}-${month}-${year}`;
};
