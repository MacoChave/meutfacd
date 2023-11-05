import * as yup from 'yup';

export type TDictamen = {
    titulo: string;
    ruta_dictamen: string;
    detalle: string;
};

export const dictamenDefault: TDictamen = {
    titulo: '',
    ruta_dictamen: '',
    detalle: '',
};

export const dictamenSchema = yup.object().shape({
    titulo: yup.string().required('El nombre es requerido'),
    ruta_dictamen: yup.string().required('La ruta es requerida'),
    detalle: yup.string().required('El detalle es requerido').max(255, 'El detalle no puede tener más de 255 caracteres')
})