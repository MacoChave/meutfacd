import axios from 'axios';

export const api = axios.create({
	baseURL: import.meta.env.VITE_API || 'http://localhost:3333',
});

export const URL = {
	AUTH: {
		_: '/auth',
		LOGIN_ESTUDIANTE: '/auth/login/estudiante',
		LOGIN_PROFESOR: '/auth/login/profesor',
		LOGUP_ESTUDIANTE: '/auth/logup/estudiante',
		LOGUP_PROFESOR: '/auth/logup/profesor',
	},
	CURSO: '/curso',
	ESTUDIANTE: '/estudiante',
	HORARIO: '/horario',
	JORNADA: '/jornada',
	MENSAJERIA: '/mensajeria',
	PROFESOR: '/profesor',
	ROL: '/rol',
	STORAGE: '/storage',
};
