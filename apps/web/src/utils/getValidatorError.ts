import { TypeWithKey } from '@/models/TypeWithKey';

export const getValidatorError = (errorCode: string): string | undefined => {
	const codeMatcher: TypeWithKey<string> = {
		ERR_UNKNOWN: 'Hubo un error desconocido',
		ERR_BAD_REQUEST: 'Hubo un error en la petición',
		ERR_NETWORK:
			'Hubo un error de nuestro lado, por favor intenta más tarde',
		ERR_UNAUTHORIZED: 'No tienes permisos para realizar esta acción',
		ERR_FORBIDDEN: 'No tienes permisos para realizar esta acción',
		ERR_NOT_FOUND: 'No se encontró el recurso solicitado',
		ERR_INTERNAL_SERVER_ERROR: 'Hubo un error en el servidor',
		ERR_SERVICE_UNAVAILABLE: 'El servicio no está disponible',
		ERR_NO_DATA: 'No se encontraron datos',
		ERR_NO_DATA_FOUND: 'No se encontraron datos',
	};

	return codeMatcher[errorCode] || undefined;
};
