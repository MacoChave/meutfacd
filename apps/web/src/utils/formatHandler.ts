import { TypeWithKey } from '@/models/TypeWithKey';

export const getChipLabel = (code: string) => {
	switch (code) {
		case 'E':
			return 'En espera';
		case 'A':
			return 'Aprobado';
		case 'R':
			return 'Rechazado';
		case 'P':
			return 'Previa';
		case 'V':
			return 'Revisión';
		default:
			return 'Sin datos';
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

type formatDateType = {
	date: Date;
	setDay?: number;
	setHour?: number;
	onlyTime?: boolean;
	onlyMonth?: boolean;
};

export const formatDateToInput = ({
	date,
	setDay,
	setHour,
	onlyTime,
	onlyMonth,
}: formatDateType): string => {
	if (setDay) date.setDate(setDay);
	if (setHour) date.setHours(setHour);

	const str = date.toLocaleString('fr-CA', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		timeZone: 'America/Guatemala',
	});

	return str;
};
