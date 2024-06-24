// import {
// 	BaseEntity,
// 	Column,
// 	Entity,
// 	OneToMany,
// 	PrimaryGeneratedColumn,
// } from 'typeorm';
// import { Message } from './Message';

// @Entity('ut_chat')
// export class Chat extends BaseEntity {
// 	@PrimaryGeneratedColumn()
// 	id_chat: number;

// 	@Column({ type: 'json' })
// 	miembros: string;

// 	@Column({ type: 'date' })
// 	fecha_creacion: string;

// 	@Column({ type: 'date' })
// 	fecha_modificacion: string;

// 	@OneToMany(() => Message, (message: Message) => message.id_chat)
// 	messages: Message[];
// }
