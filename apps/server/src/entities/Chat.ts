import {
	Column,
	CreateDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { UTMessage } from './Message';

@Entity('ut_chat')
export class UTChat {
	@PrimaryGeneratedColumn()
	id_chat: number;

	@Column({ type: 'json' })
	miembros: number[];

	@CreateDateColumn()
	fecha_creacion: Date;

	@UpdateDateColumn()
	fecha_modificacion: Date;

	@OneToMany(() => UTMessage, (message: UTMessage) => message.chat)
	messages: UTMessage[];
}
