import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

const Profesor = sequelize.define(
	'perfil_tutor',
	{
		id_tutor: {
			type: DataTypes.INTEGER,
			primaryKey: true,
		},
		no_colegiado: {
			type: DataTypes.STRING(20),
			allowNull: false,
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
	}
);

// Crear relación un usuario tiene un perfil de profesor
import Usuario from './usuario';

Usuario.hasOne(Profesor, { foreignKey: 'id_usuario' });
Profesor.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// Crear relación un rol tiene muchos profesores
import Rol from './rol';

Rol.hasMany(Profesor, { foreignKey: 'id_rol' });
Profesor.belongsTo(Rol, { foreignKey: 'id_rol' });

export default Profesor;
