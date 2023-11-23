export type TNotification = {
	id_notificacion: number;
	mensaje: string;
	fecha: string;
	activo: boolean;
	id_emisor: number;
	emisor: string;
	id_receptor: number;
	receptor: string;
	correo_receptor: string;
};
