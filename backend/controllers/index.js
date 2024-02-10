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
							train_id: response.train_id,
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

	getWallet: async ({ wallet_id }) => {
		try {
			const response = await db.User.findByPk(wallet_id);
			if (response) {
				return {
					status: true,
					data: {
						wallet_id: response.user_id,
						balance: response.balance,
						wallet_user: {
							user_id: response.user_id,
							user_name: response.user_name,
						},
					},
				};
			}
		} catch (error) {
			return {
				status: false,
				message: error.message,
			};
		}
	},
	getAllStations: async () => {
		try {
			const response = await db.Station.findAll();
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

	getAllTrains: async ({ station_id }) => {
		try {
			const response = await db.Stop.findAll({
				where: { station_id },
				order: [
					["departure_time", "ASC"],
					["arrival_time", "ASC"],
				],
			});
			if (response && response.length > 0) {
				return {
					status: true,
					data: {
						station_id: parseInt(station_id),
						trains: response,
					},
				};
			} else {
				const response = await db.Station.findByPk(station_id);
				if (response) {
					return {
						status: true,
						data: {
							station_id: response.station_id,
							trains: [],
						},
					};
				} else {
					throw new Error(
						`station with id: ${station_id} was not found`
					);
				}
			}
		} catch (error) {
			return {
				status: false,
				message: error.message,
			};
		}
	},

	getWalletBalance: async ({ wallet_id }) => {
		try {
			const response = await db.User.findByPk(wallet_id);
			if (response) {
				return {
					status: true,
					data: {
						wallet_id: response.user_id,
						wallet_balance: response.balance,
						wallet_user: {
							user_id: response.user_id,
							user_name: response.user_name,
						},
					},
				};
			} else {
				throw new Error(`wallet with id: ${wallet_id} was not found`);
			}
		} catch (error) {
			return {
				status: false,
				message: error.message,
			};
		}
	},

	addWalletBalance: async ({ recharge, user_id }) => {
		try {
			const response = await db.User.increment(
				{ balance: recharge },
				{ where: { user_id } }
			);
			const updated = await db.User.findByPk(user_id);
			if (response && updated) {
				return {
					status: true,
					data: {
						wallet_id: updated.user_id,
						wallet_balance: updated.balance,
						wallet_user: {
							user_id: updated.user_id,
							user_name: updated.user_name,
						},
					},
				};
			} else {
				throw new Error(`wallet with id: ${user_id} was not found`);
			}
		} catch (error) {
			return {
				status: false,
				message: error.message,
			};
		}
	},

	purchaseTicket: async ({ info }) => {
		try {
			const trains = await db.Train.findAll({
				include: [{ model: db.Stop }],
			});

			let stops = new Array(trains.length);
			let i = 0;
			trains.forEach((train) => {
				let x = train.Stops.sort((a, b) => (a.id > b.id ? 1 : -1));
				stops[i] = new Array(x.length);
				for (let j = 0; j < x.length; j++) {
					const obj = {
						sid: x[j].dataValues.station_id,
						fare: x[j].dataValues.fare,
						s: x[j].dataValues.arrival_time,
						e: x[j].dataValues.departure_time,
					};
					stops[i].push(obj);
				}
				i++;
			});

			const x = module.exports.shortestPath(stops, 1, 4);

			console.log(x);

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

	shortestPath: (graph, start, end) => {
		let distances = {};
		let visited = {};
		let path = [];

		// Initialize distances
		for (let station_id in graph) {
			distances[station_id] = Infinity;
		}
		distances[start] = 0;

		while (true) {
			let shortestStation = null;

			// Find the nearest station
			for (let station_id in distances) {
				if (graph[station_id] && !visited[station_id]) {
					if (
						shortestStation === null ||
						distances[station_id] < distances[shortestStation]
					) {
						shortestStation = station_id;
					}
				}
			}

			if (shortestStation === null) {
				break;
			}

			// Update distances to neighboring stations
			for (let neighbor in graph[shortestStation]) {
				let distance =
					distances[shortestStation] +
					graph[shortestStation][neighbor];
				if (distance < distances[neighbor]) {
					distances[neighbor] = distance;
					visited[neighbor] = shortestStation;
				}
			}

			visited[shortestStation] = true;
		}

		// Build path
		let current = end;
		while (current !== start) {
			path.unshift(current);
			current = visited[current];
		}
		path.unshift(start);

		return { distance: distances[end], path };
	},
};
