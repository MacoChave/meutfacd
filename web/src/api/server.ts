import axios from 'axios';

export const api = axios.create({
	baseURL: import.meta.env.VITE_API || 'http://localhost:3333',
});

export const URL = {
	AUTH: {
		_: '/auth',
		LOGIN: '/auth/login',
		LOGUP: '/auth/logup',
		PROFILE: '/auth/perfil',
	},
	USUARIO: '/usuario',
	CURSO: '/curso',
	ESTUDIANTE: '/estudiante',
	HORARIO: '/horario',
	JORNADA: '/jornada',
	MENSAJERIA: '/mensajeria',
	PROFESOR: '/profesor',
	ROL: '/rol',
	STORAGE: '/storage',
};
