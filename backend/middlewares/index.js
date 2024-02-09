module.exports = {
	checkValidity: async (req, res, next) => {
		try {
			let flag = true;
			if (flag) {
				await new Promise(() =>
					setTimeout(() => {
						next();
					}, 1000)
				);
				next("Error 505.");
			} else {
				throw new Error("There was an validation error.");
			}
		} catch (error) {
			next(error);
		}
	},

	checkAmount: (req, res, next) => {
		const recharge = req.body.recharge;
		if (recharge < 100 || recharge > 10000) {
			res.status(400);
			next(`invalid amount ${recharge}`);
		} else {
			next();
		}
	},
};
