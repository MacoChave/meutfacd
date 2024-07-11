import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';
import { UTChat } from './Chat';
import { Usuario } from './Usuario';

@Entity('ut_message')
export class UTMessage {
	@PrimaryGeneratedColumn()
	id_message: number;

	@ManyToOne(() => UTChat, (chat) => chat.messages)
	@JoinColumn({ name: 'id_chat' })
	chat: UTChat;

	@ManyToOne(() => Usuario, (usuario) => usuario.messages)
	@JoinColumn({ name: 'autor' })
	autor: Usuario;

	@Column({ length: 255 })
	texto: string;

	@Column({ type: 'char', length: 1, default: 'E' })
	estado: string;

	@CreateDateColumn()
	fecha_envio: Date;
}
