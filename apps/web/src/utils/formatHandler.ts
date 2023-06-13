import { TypeWithKey } from '@/models/TypeWithKey';

const getDataType = (key: string): string => {
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
			return new Date(value).toLocaleDateString('es-GT');
		case 'boolean':
			return value ? 'Si' : 'No';
		default:
			return value;
	}
};

export const formatDate = (date: Date, isFullDate: boolean = true): string => {
	const year = date.toLocaleString('default', { month: 'numeric' });
	const month = date.toLocaleString('default', { month: '2-digit' });
	const day = date.toLocaleString('default', { day: '2-digit' });

	return `${year}-${month}${isFullDate && `-${day}`}`;
};
