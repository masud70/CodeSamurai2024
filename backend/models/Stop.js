module.exports = (sequelize, DataTypes) => {
	const Stop = sequelize.define(
		"Stop",
		{
			station_id: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			arrival_time: {
				type: DataTypes.STRING,
				defaultValue: null,
			},
			departure_time: {
				type: DataTypes.STRING,
				defaultValue: null,
			},
			fare: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
		},
		{
			timestamp: false,
		}
	);

	// Stop.associate = () => {
	// 	Stop.belongsTo(sequelize.module.Train);
	// };

	return Stop;
};
