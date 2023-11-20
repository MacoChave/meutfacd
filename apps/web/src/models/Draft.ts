import * as yup from 'yup';

export type TDraft = {
	name: string;
	titulo: string;
};

export const draftDefault: TDraft = {
	name: '',
	titulo: '',
};

export const draftSchema = yup.object().shape({
	name: yup.string().required('El nombre es requerido'),
	titulo: yup
		.string()
		.required('La descripción es requerida')
		.max(255, 'La descripción no puede tener más de 255 caracteres'),
});
