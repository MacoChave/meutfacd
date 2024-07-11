import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { Usuario } from './Usuario';

@Entity('ut_notificacion')
export class UTNotificacion {
	@PrimaryGeneratedColumn()
	id_notificacion: number;

	@Column({ length: 255 })
	mensaje: string;

	@CreateDateColumn()
	fecha: Date;

	@Column({ type: 'tinyint', default: 1 })
	activo: boolean;

	@ManyToOne(() => Usuario, (usuario) => usuario.notificacionesEnviadas)
	@JoinColumn({ name: 'id_emisor' })
	emisor: Usuario;

	@ManyToOne(() => Usuario, (usuario) => usuario.notificacionesRecibidas)
	@JoinColumn({ name: 'id_receptor' })
	receptor: Usuario;
}
