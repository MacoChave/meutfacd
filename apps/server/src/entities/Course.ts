// import {
// 	BaseEntity,
// 	Column,
// 	Entity,
// 	ManyToMany,
// 	PrimaryGeneratedColumn,
// } from 'typeorm';
// import { User } from './User';

// @Entity('ut_curso')
// export class Course extends BaseEntity {
// 	@PrimaryGeneratedColumn()
// 	id_curso: number;

// 	@Column({ type: 'varchar', length: 128 })
// 	nombre: string;

// 	@ManyToMany(() => User, (user: User) => user.courses)
// 	users: User[];
// }
