import {
	Column,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToOne,
	PrimaryColumn,
} from 'typeorm';
import { Usuario } from './Usuario';
import { UTHorario } from './Horario';

@Entity('ut_perfil')
export class UTPerfil {
	@PrimaryColumn()
	id_usuario: number;

	@PrimaryColumn()
	id_horario: number;

	@PrimaryColumn()
	id_jornada: number;

	@Column({ length: 50, nullable: true })
	ocupacion: string;

	@OneToOne(() => Usuario, (usuario: Usuario) => usuario.perfil)
	@JoinColumn({ name: 'id_usuario' })
	usuario: Usuario;

	@ManyToOne(() => UTHorario)
	@JoinColumn([
		{ name: 'id_horario', referencedColumnName: 'id_horario' },
		{ name: 'id_jornada', referencedColumnName: 'id_jornada' },
	])
	horario: UTHorario;
}

// import {
// 	BaseEntity,
// 	Column,
// 	Entity,
// 	JoinColumn,
// 	ManyToOne,
// 	OneToOne,
// 	PrimaryColumn,
// } from 'typeorm';
// import { User } from './User';
// import { Schedule } from './Schedule';

// @Entity('ut_perfil')
// export class Profile extends BaseEntity {
// 	@PrimaryColumn()
// 	@OneToOne(() => User, (user: User) => user.profile)
// 	@JoinColumn({ name: 'id_usuario' })
// 	id_usuario: number;

// 	@ManyToOne(() => Schedule, (schedule: Schedule) => schedule.profiles)
// 	@JoinColumn([
// 		{ name: 'id_horario', referencedColumnName: 'id_horario' },
// 		{ name: 'id_jornada', referencedColumnName: 'id_jornada' },
// 	])
// 	schedule: Schedule;

// 	@Column()
// 	ocupacion: string;
// }
