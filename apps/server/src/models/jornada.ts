import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

const Jornada = sequelize.define(
	'jornada',
	{
		id_jornada: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nombre: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
	},
	{
		timestamps: true,
		createdAt: true,
		updatedAt: true,
		freezeTableName: true,
	}
);

export default Jornada;
