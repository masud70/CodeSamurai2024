module.exports = (sequelize, DataTypes) => {
	const Station = sequelize.define(
		"Station",
		{
			station_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			station_name: {
				type: DataTypes.TEXT,
			},
			longitude: {
				type: DataTypes.DOUBLE,
				defaultValue: 0,
			},
			latitude: {
				type: DataTypes.DOUBLE,
				defaultValue: 0,
			},
		},
		{
			timestamp: false,
		}
	);

	return Station;
};
