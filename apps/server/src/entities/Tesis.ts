import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ut_tesis')
export class Tesis extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_tesis: number;

	@Column()
	titulo: string;

	@Column()
	ruta_perfil: string;

	@Column()
	ruta_tesis: string;

	@Column()
	ruta_asesor: string;

	@Column()
	fecha_creacion: string;

	@Column()
	fecha_modificacion: string;

	@Column()
	id_estudiante: number;
}
