import { DataTypes } from 'sequelize';
import sequelize from '../config/db';

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

// Crear relación un usuario tiene un perfil de estudiante
import Usuario from './usuario';

Usuario.hasOne(Estudiante, { foreignKey: 'id_estudiante' });
Estudiante.belongsTo(Usuario, { foreignKey: 'id_estudiante' });

// Crear relación un horario tiene muchos estudiantes
import Horario from './horario';

Horario.hasMany(Estudiante, { foreignKey: 'id_horario' });
Estudiante.belongsTo(Horario, { foreignKey: 'id_horario' });

export default Estudiante;
