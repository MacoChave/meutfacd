import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

const Rol = sequelize.define(
	'rol',
	{
		id_rol: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nombre: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		descripcion: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
	},
	{
		timestamps: false,
		createdAt: true,
		updatedAt: true,
	}
);

export default Rol;
