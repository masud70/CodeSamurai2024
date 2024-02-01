const db = require("../models");

module.exports = {
	isAnyPointExist: async ({ point }) => {
		try {
			const response = await db.Point.findAll({ where: point });
			if (response.length == 0)
				return {
					status: true,
					message: "The point does not exist.",
				};
			else {
				throw new Error("The point already exists.");
			}
		} catch (error) {
			return {
				status: false,
				message: error.message,
			};
		}
	},
	addPoint: async ({ point }) => {
		try {
			const response = await db.Point.create(point);
			if (response)
				return {
					added: {
						point,
					},
				};
			else {
				throw new Error("There was an error.");
			}
		} catch (error) {
			return {
				status: false,
				message: error.message,
			};
		}
	},
	centerOfGravity: async () => {
		try {
			const response = await db.Point.findAll();
			var x = 0,
				y = 0;
			response.forEach((point) => {
				x += point.dataValues.x;
				y += point.dataValues.y;
			});
			if (response.length > 0) {
				x /= response.length;
				y /= response.length;
			}
			x = Math.floor(x);
			y = Math.floor(y);

			return {
				status: true,
				data: {
					x,
					y,
				},
			};
		} catch (error) {
			return {
				status: false,
				message: error.message,
			};
		}
	},
};

// try {
// } catch (error) {
//     return {
//         status: false,
//         message: error.message,
//     };
// }
