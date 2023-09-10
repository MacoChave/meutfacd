import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

const Profesor = sequelize.define(
	'perfil_tutor',
	{
		id_tutor: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		no_colegiado: {
			type: DataTypes.STRING(20),
			allowNull: true,
		},
		id_rol: {
			type: DataTypes.INTEGER,
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

export default Profesor;
