import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';
import { Usuario } from './Usuario';
import { UTRevision } from './Revision';

@Entity({ name: 'ut_tesis' })
export class UTTesis {
	@PrimaryGeneratedColumn()
	id_tesis: number;

	@Column({ type: 'varchar', length: 255 })
	titulo: string;

	@Column({ type: 'varchar', length: 255 })
	ruta_perfil: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	ruta_tesis: string;

	@Column({ type: 'varchar', length: 255, nullable: true })
	ruta_asesor: string;

	@CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	fecha_creacion: Date;

	@UpdateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
	fecha_modificacion: Date;

	@Column({ type: 'int', unsigned: true })
	id_estudiante: number;

	@ManyToOne(() => Usuario, (usuario: Usuario) => usuario.tesis)
	@JoinColumn({ name: 'id_estudiante' })
	estudiante: Usuario;

	@OneToMany(() => UTRevision, (revision: UTRevision) => revision.tesis)
	revisions: UTRevision[];
}
