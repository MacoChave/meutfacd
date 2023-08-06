import { Control } from '@/models/Control';
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
	const { auth }: Control = store.getState().control;
	// const dispatch = useDispatch();
	const { method, url } = config;

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
			title: 'Oops!',
			text: errorMessage,
			icon: 'error',
		});

		if (status === 401) {
			// DELETE TOKEN & GO TO LOGIN PAGE
			logOnDev(`[API] | Error ${error.message}`);
		}
	} else {
		logOnDev(`[API] | Error ${error.message}`);
		swal('Oops!', error.message, 'error');
	}

	return Promise.reject(error);
};

export const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
	instance.interceptors.request.use(onRequest, onErrorResponse);
	instance.interceptors.response.use(onResponse, onErrorResponse);
	return instance;
};
