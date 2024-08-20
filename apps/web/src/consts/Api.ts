export const BASE_URL =
	import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const URL = {
	ACCESS: '/api/v1/access',
	ASSIGNMENT: '/api/v1/assignment',
	AUTH: {
		LOGIN: '/api/v1/auth/login',
		LOGUP: '/api/v1/auth/logup',
		PROFILE: '/api/v1/auth/profile',
		VERIFY: '/api/v1/auth/verified-email',
		RECOVERY: '/api/v1/auth/recovery',
	},
	CHAT: '/api/v1/chat',
	COURSE_TUTOR: '/api/v1/course_tutor',
	COURSE: {
		_: '/api/v1/course',
		ASIGNACION: '/api/v1/course/assignment',
	},
	GENERIC: '/api/v1/generic',
	MAILING: '/api/v1/mailing',
	MESSAGE: '/api/v1/message',
	NOTIFICATION: '/api/v1/messaging',
	PAGE: '/api/v1/page',
	PDF: '/api/v1/pdf',
	PERIOD: '/api/v1/period',
	PERMISSION: '/api/v1/permission',
	PROFESOR: '/api/v1/professor',
	REVIEW: '/api/v1/review',
	ROL: '/api/v1/rol',
	SCHEDULE: '/api/v1/schedule',
	STORAGE: '/api/v1/storage',
	STUDENT: '/api/v1/student',
	THESIS: '/api/v1/thesis',
	USER_ROL: '/api/v1/user_rol',
	USER: '/api/v1/user',
};

export const URL_V2 = {
	USER: '/api/v2/user',
	ROL: '/api/v2/rol',
};
