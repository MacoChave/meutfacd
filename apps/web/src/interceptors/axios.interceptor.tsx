import { API_V1 } from '@/consts/Api';
import { TControl } from '@/models/Control';
import { setLogout } from '@/redux/states';
import store from '@/redux/store';
import { getValidatorError } from '@/utils/getValidatorError';
import axios, {
	AxiosError,
	AxiosInstance,
	AxiosRequestConfig,
	AxiosResponse,
} from 'axios';
import swal from 'sweetalert';

const logOnDev = (message: Object) => {
	if (import.meta.env.MODE === 'development') {
		console.log(message);
	}
};

const onRequest = (config: AxiosRequestConfig): any => {
	const { auth }: TControl = store.getState().control;
	// const dispatch = useDispatch();
	const { method } = config;

	config.baseURL = API_V1;
	config.headers = {
		...config.headers,
		Authorization: `Bearer ${auth ? auth.token : ''}`,
	};

	// logOnDev({ method: method?.toUpperCase(), url, Request });

	if (method === 'get') {
		config.timeout = 15000;
	}
	return config;
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
	// const dispatch = useDispatch();
	const { method, url } = response.config;
	const { status, data } = response;

	// dispatch(setLoading(true));
	// HANDLE RESPONSE DATA
	// ERROR HANDLING WHEN RETURN SUCCESS WITH ERROR
	// logOnDev({ method: method?.toUpperCase(), url, Response, status, data });
	return response;
};

const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
	if (axios.isAxiosError(error)) {
		const { method, url } = error.config as AxiosRequestConfig;
		const { statusText, status, data } =
			(error.response as AxiosResponse) ?? {};

		const errorMessage = getValidatorError(statusText) || data.error;

		logOnDev({
			method: method?.toUpperCase(),
			url,
			Error,
			status,
			statusText,
			errorMessage,
		});

		swal({
			title: '!Oops!',
			text: errorMessage,
			icon: 'error',
			buttons: {
				accept: {
					text: 'Aceptar',
					value: status,
				},
			},
		}).then((value) => {
			if (value === 401) {
				// DELETE TOKEN & GO TO LOGIN PAGE
				setLogout();
				window.location.href = '/';
			}
		});

		logOnDev(`[API] | AxiosError ${error.message}`);
	} else {
		logOnDev(`[API] | Error ${error.message}`);
		swal('!Oops!', error.message, 'error');
	}

	return Promise.reject(error);
};

export const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
	instance.interceptors.request.use(onRequest, onErrorResponse);
	instance.interceptors.response.use(onResponse, onErrorResponse);
	return instance;
};
