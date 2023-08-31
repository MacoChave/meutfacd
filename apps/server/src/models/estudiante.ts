import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

const Estudiante = sequelize.define(
	'perfil_estudiante',
	{
		id_estudiante: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		id_horario: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		id_jornada: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		timestamps: true,
		createdAt: true,
		updatedAt: true,
		freezeTableName: true,
	}
);

export default Estudiante;
