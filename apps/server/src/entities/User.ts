import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('usuario')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_usuario: number;
	@Column()
	nombre: string;
	@Column()
	apellidos: string;
	@Column()
	genero: string;
	@Column()
	correo: string;
	@Column()
	pass: string;
	@Column()
	direccion: string;
	@Column()
	telefono: string;
	@Column()
	fecha_nac: string;
	@Column()
	estado: string;
	@Column()
	id_municipio: number;
	@Column()
	doc_cui: string;
	@Column()
	carnet: number;
	@Column()
	cui: number;
}
