module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define(
		"User",
		{
			user_id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true,
			},
			user_name: {
				type: DataTypes.TEXT,
			},
			balance: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
		},
		{
			timestamp: false,
		}
	);

	return User;
};
