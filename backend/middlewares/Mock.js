const { isAnyPointExist } = require("../controllers/Problem1");

module.exports = {
	isAnyPointExistCheck: async (req, res, next) => {
		const respose = await isAnyPointExist({ point: req.body });
		if (respose.status) {
			res.status(201);
			next();
		} else res.sendStatus(200);
	},
};
