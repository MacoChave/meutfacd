import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

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
			unique: true,
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
		freezeTableName: true,
	}
);

export default Rol;
