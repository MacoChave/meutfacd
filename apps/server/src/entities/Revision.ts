import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ut_revision')
export class Revision extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_revision: number;

	@Column()
	fecha: string;

	@Column()
	titulo: string;

	@Column()
	detalle: string;

	@Column()
	ruta_certificado: string;

	@Column()
	ruta_dictamen: string;

	@Column()
	id_curso_tutor: number;

	@Column()
	id_tutor: number;

	@Column()
	id_tesis: number;

	@Column()
	estado: string;

	@Column()
	estacion: string;

	@Column()
	sala: string;
}
