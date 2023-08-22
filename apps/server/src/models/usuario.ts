import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

const Usuario = sequelize.define(
	'usuario',
	{
		id_usuario: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		nombre: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		apellido: {
			type: DataTypes.STRING(75),
			allowNull: false,
		},
		genero: {
			type: DataTypes.CHAR(1),
			allowNull: false,
		},
		correo: {
			type: DataTypes.STRING(100),
			allowNull: false,
		},
		pass: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
		carnet: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
		cui: {
			type: DataTypes.STRING(20),
			allowNull: false,
		},
		direccion: {
			type: DataTypes.STRING(200),
			allowNull: false,
		},
		fecha_nac: {
			type: DataTypes.DATEONLY,
			allowNull: false,
		},
		estado: {
			type: DataTypes.CHAR(1),
			allowNull: false,
		},
		telefono: {
			type: DataTypes.STRING(25),
			allowNull: true,
		},
	},
	{
		timestamps: false,
		createdAt: false,
		updatedAt: false,
		deletedAt: false,
		underscored: true,
		freezeTableName: true,
	}
);

export default Usuario;
