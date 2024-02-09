const db = require("../models");

module.exports = {
	welcome: async () => {
		try {
			let flag = true;
			if (flag) {
				return {
					status: true,
					message: "Welcome to CU_CODECONQUEST,",
				};
			} else {
				throw new Error("There was an error.");
			}
		} catch (error) {
			return {
				status: false,
				message: error.message,
			};
		}
	},

	addUser: async ({ user }) => {
		try {
			console.log("Data: ",user);
			const response = await db.User.create(user);
			if (response) {
				return {
					status: true,
					data: response,
				};
			} else {
				throw new Error("There was an error.");
			}
		} catch (error) {
			return {
				status: false,
				message: error.message,
			};
		}
	},
};
