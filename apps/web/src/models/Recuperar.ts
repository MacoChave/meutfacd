import * as yup from 'yup';

export type TRecovery = {
	pass: string;
	confpass: string;
};

export const recoveryDefault: TRecovery = {
	pass: '',
	confpass: '',
};

export const schemaRecovery = yup.object().shape({
	pass: yup
		.string()
		.required('Contraseña es requerida')
		.max(25, 'Contraseña no puede ser mayor a 25'),
	confpass: yup
		.string()
		.required('Confirmar contraseña es requerido')
		.max(25, 'Confirmar contraseña no puede ser mayor a 25')
		.when('pass', {
			is: (val: string) => (val && val.length > 0 ? true : false),
			then: yup
				.string()
				.oneOf([yup.ref('pass')], 'Las contraseñas no coinciden'),
		}),
});
