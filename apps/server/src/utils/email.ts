import nodemailer from 'nodemailer';
import { DATA_SOURCES } from '../config/vars.config';
import {
	TEmailFromActivity,
	TEmailFromRecovery,
	TEmailFromVerification,
	TEmailHTML,
	TSendEmail,
} from '../models/email';

export const getHead = (): string => {
	return `
<head>
    <!--[if !mso]> -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif] -->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- GOOGLE FONTS -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&amp;display=swap" rel="stylesheet"
        type="text/css" />
    <style type="text/css">
        @import url(https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500&amp;display=swap);
    </style>
</head>
`;
};

export const getBodyFromVerification = ({
	username = 'Usuario',
	email = 'email@example.com',
}: TEmailFromVerification) => {
	return `
        <!-- CONTENT -->
        <div style="background: #ffffff; padding: 25px;">
            <p style="font-size: xx-large; font-weight: bold;">Verificación de correo electrónico</p>
            <p>Estimado ${username}</p>
            <p>¡Gracias por registrarte en nuestro sistema de unidad de tesis! Para completar el proceso de registro,
                necesitamos verificar
                tu dirección de correo electrónico.</p>
            <p>Por favor, haz clic en el siguiente enlace para confirmar tu correo electrónico: <a
                    href="${DATA_SOURCES.URL_EMAIL_VERIFIED}/${btoa(
		email
	)}">Verificar correo electrónico</a></p>
        </div>`;
};

export const getBodyFromRecovery = ({ email }: TEmailFromRecovery) => {
	return `
        <!-- CONTENT -->
        <div style="background: #ffffff; padding: 25px;">
            <p style="font-size: xx-large; font-weight: bold;">Recuperación de contraseña</p>
            <p>Estimado usuario</p>
            <p>Hemos recibido una solicitud para recuperar tu dirección de correo electrónico asociada a tu cuenta en nuestro sistema de educación.</p>
            <p>Por favor, haz clic en el siguiente enlace para cambiar tu contraseña: <a
                    href="${DATA_SOURCES.URL_PASS_RECOVERY}/${btoa(
		email
	)}">Cambio de contraseña</a></p>
        </div>`;
};

export const getBodyFromActivity = ({
	username = 'Usuario',
	action = 'creado',
	title = 'Actividad',
	description = 'Actividad en el portal de la unidad de tesis',
}: TEmailFromActivity) => {
	return `
        <!-- CONTENT -->
        <div style="background: #ffffff; padding: 25px;">
            <p style="font-size: xx-large; font-weight: bold;">Nueva actividad</p>
            <p>Estimado ${username}</p>
            <p>Esperamos que te encuentres bien. Queremos informarte que se ha ${action} una actividad en tu cuenta.</p>
            <p>Detalles:</p>
            <ul>
                <li>Título: ${title}</li>
                <li>Descripción: ${description}</li>
            </ul>
            <p>Por favor, inicia sesión en tu cuenta para revisar y completar la tarea. Si tienes alguna pregunta o necesitas clarificaciones adicionales, no dudes en contactar a tu profesor/a.</p>
            <a href="${DATA_SOURCES.URL_FRONTEND}" style="background: #1a237e color: #ffffff; font-size: 18px text-transform: none; padding: 10px 25px; border-radious: 3px">Iniciar sesión</a>
        </div>`;
};

export const getHTML = ({ body }: TEmailHTML) => {
	return `<!DOCTYPE html>
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
    xmlns:o="urn:schemas-microsoft-com:office:office">
${getHead()}

<body style="background-color: #f3f3f5; font-family: 'Poppins', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
    <div
        style="background-color: #f3f3f5; display: grid; grid-template-rows: repeat(1fr, 2fr, 1fr); min-height: calc(100vh - 10rem); width: min(70vw, 600px); margin: 4rem auto;">
        <!-- HEADER -->
        <div
            style="background:#c62828; border-radius: 8px 8px 0 0; padding: 25px;">
            <div style="margin: auto;">
                <p style="color: #ffffff; font-size: xx-large;">Unidad de tesis</p>
            </div>
        </div>
${body}
        <!-- INFO -->
        <div style="background: #d5d5d5; padding: 25px;">
            <p style="font-size: small;">Si no has solicitado este registro o no eres el destinatario previsto, por
                favor ignora este mensaje.</p>
        </div>
        <!-- FOOTER -->
        <div style="background:#1a237e; padding: 25px;">
            <div style="padding: 1rem; color: #fff;">
                <a href="https://siderusac.com/unidad-tesis" style="color: #fff; text-decoration: none;">Unidad de tesis</a>
                <p style="margin: 0; font-size: small; font-weight: 500;">Unidad de Tesis</p>
                <p style="margin: 0; font-size: small; font-weight: 500;">Facultad de Ciencias Jurídicas y Sociales</p>
                <p style="margin: 0; font-size: small; font-weight: 500;">Universidad de San Carlos de Guatemala</p>
                <p style="margin: 0; font-size: small; font-weight: 500;">&nbsp;</p>
            </div>
        </div>
    </div>
</body>

</html>`;
};

export const sendEmail = async ({
	to,
	subject,
	plainText,
	content,
}: TSendEmail) => {
	let transporter = nodemailer.createTransport({
		host: DATA_SOURCES.SMTP_HOST,
		port: DATA_SOURCES.SMTP_PORT,
		secure: true,
		auth: {
			user: DATA_SOURCES.SMTP_USERNAME,
			pass: DATA_SOURCES.SMPT_PASSWORD,
		},
	});

	let info = await transporter.sendMail({
		from: DATA_SOURCES.SMTP_USERNAME,
		to: to,
		subject: subject,
		text: plainText,
		html: getHTML({ body: content }),
	});

	return info;
};
