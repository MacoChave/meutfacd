// import {
// 	BaseEntity,
// 	Column,
// 	Entity,
// 	JoinColumn,
// 	ManyToOne,
// 	PrimaryGeneratedColumn,
// } from 'typeorm';
// import { Chat } from './Chat';

// @Entity('ut_message')
// export class Message extends BaseEntity {
// 	@PrimaryGeneratedColumn()
// 	id_message: number;

// 	@Column()
// 	id_chat: number;

// 	@Column()
// 	autor: string;

// 	@Column()
// 	texto: string;

// 	@Column({ default: 'E' })
// 	estado: string;

// 	@Column()
// 	fecha_envio: string;

// 	@ManyToOne(() => Chat, (chat: Chat) => chat.messages)
// 	@JoinColumn({ name: 'id_chat' })
// 	chat: Chat;
// }
