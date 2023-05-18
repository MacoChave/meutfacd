import { DataTypes } from 'sequelize';
import sequelize from '../config/sequelize';

const Horario = sequelize.define(
	'horario',
	{
		id_horario: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		hora_inicio: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		hora_fin: {
			type: DataTypes.TIME,
			allowNull: false,
		},
		id_jornada: {
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

// Crear relación una jornada tiene muchos horarios
import Jornada from './jornada';

Jornada.hasMany(Horario, { foreignKey: 'id_jornada' });
Horario.belongsTo(Jornada, { foreignKey: 'id_jornada' });

export default Horario;
