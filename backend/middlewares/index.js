module.exports = {
	checkValidity: async (req, res, next) => {
		try {
			let flag = true;
			if (flag) {
				await new Promise(() =>
					setTimeout(() => {
						next();
					}, 5000)
				);
				next("Error 505.");
			} else {
				throw new Error("There was an validation error.");
			}
		} catch (error) {
			next(error);
		}
	},
};
