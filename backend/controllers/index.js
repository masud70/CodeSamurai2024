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

	addStation: async ({ station }) => {
		try {
			const response = await db.Station.create(station);
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

	addTrain: async ({ train }) => {
		try {
			const response = await db.Train.create({
				train_id: train.train_id,
				train_name: train.train_name,
				capacity: train.capacity,
			});
			if (response) {
				train.stops.forEach(async (stop) => {
					if (
						!(await db.Stop.create({
							station_id: stop.station_id,
							arrival_time: stop.arrival_time,
							departure_time: stop.departure_time,
							fare: stop.fare,
							trainId: response.train_id,
						}))
					) {
						throw new Error(
							"There was an error adding stops data."
						);
					}
				});
				return {
					status: true,
					data: {
						...response.dataValues,
						service_start: train.stops[0].departure_time,
						service_ends:
							train.stops[train.stops.length - 1].arrival_time,
						num_stations: train.stops.length,
					},
				};
			} else {
				throw new Error("There was an error to add train data.");
			}
		} catch (error) {
			return {
				status: false,
				message: error.message,
			};
		}
	},
};
