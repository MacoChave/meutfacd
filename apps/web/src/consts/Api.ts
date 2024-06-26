export const API_V1 =
	import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const URL = {
	ASSIGNMENT: '/api/assignment',
	AUTH: {
		LOGIN: '/api/auth/login',
		LOGUP: '/api/auth/logup',
		PROFILE: '/api/auth/profile',
		VERIFY: '/api/auth/verified-email',
		RECOVERY: '/api/auth/recovery',
	},
	COURSE: {
		_: '/api/course',
		ASIGNACION: '/api/course/assignment',
	},
	COURSE_TUTOR: '/api/course_tutor',
	GENERIC: '/api/generic',
	NOTIFICATION: '/api/messaging',
	MESSAGE: '/api/message',
	CHAT: '/api/chat',
	MAILING: '/api/mailing',
	PERIOD: '/api/period',
	PERMISSION: '/api/permission',
	PROFESOR: '/api/professor',
	PDF: '/api/pdf',
	REVIEW: '/api/review',
	ROL: '/api/rol',
	SCHEDULE: '/api/schedule',
	STORAGE: '/api/storage',
	STUDENT: '/api/student',
	THESIS: '/api/thesis',
	USER_ROL: '/api/user_rol',
	USER: '/api/user',
	ACCESS: '/api/access',
};
