module.exports = (sequelize, DataTypes) => {
	const Train = sequelize.define(
		"Train",
		{
			train_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			train_name: {
				type: DataTypes.TEXT,
			},
			capacity: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
		},
		{
			timestamp: false,
		}
	);

	// Train.associate = () => {
	// 	Train.hasMany(sequelize.module.Stop);
	// };

	return Train;
};
