module.exports = (sequelize, DataTypes) => {
	const Point = sequelize.define("Point", {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		x: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		y: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	});

	return Point;
};
