import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity({
	name: 'ut_v_chat',
	expression: `SELECT 
        uc.id_chat, 
        uc.miembros, 
        ue.nombre AS n1,
        ur.nombre AS n2,
        uc.fecha_creacion,
        uc.fecha_modificacion 
    FROM ut_chat uc 
    JOIN usuario ue ON JSON_CONTAINS(uc.miembros, '$[0]') = ue.id_usuario 
    JOIN usuario ur ON JSON_CONTAINS(uc.miembros, '$[1]') = ur.id_usuario;
    `,
})
export class UTVChat {
	@ViewColumn()
	id_chat: number;

	@ViewColumn()
	miembros: number[];

	@ViewColumn({ name: 'n1' })
	emisor: string;

	@ViewColumn({ name: 'n2' })
	receptor: string;

	@ViewColumn()
	fecha_creacion: Date;

	@ViewColumn()
	fecha_modificacion: Date;
}
