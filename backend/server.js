require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const { checkValidity, checkAmount } = require("./middlewares");
const {
	welcome,
	addUser,
	addStation,
	addTrain,
	getAllStations,
	getAllTrains,
	getWalletBalance,
	addWalletBalance,
	purchaseTicket,
} = require("./controllers");
const app = express();

const PORT = process.env.NODE_DOCKER_PORT || 8000;
var corsOptions = {
	origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", checkValidity, async (req, res) => {
	try {
		const result = await welcome();
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({
			status: false,
			message: error.message,
		});
	}
});

app.post("/api/users", async (req, res) => {
	try {
		console.log(req.body);
		const result = await addUser({ user: req.body });
		console.log(result);
		if (result.status) {
			res.status(201).json(result.data);
		} else {
			throw new Error(result.message);
		}
	} catch (error) {
		res.json({
			status: false,
			message: error.message,
		});
	}
});

app.post("/api/stations", async (req, res) => {
	try {
		console.log(req.body);
		const result = await addStation({ station: req.body });
		console.log(result);
		if (result.status) {
			res.status(201).json(result.data);
		} else {
			throw new Error(result.message);
		}
	} catch (error) {
		res.json({
			status: false,
			message: error.message,
		});
	}
});

app.post("/api/trains", async (req, res) => {
	try {
		console.log(req.body);
		const result = await addTrain({ train: req.body });
		console.log(result);
		if (result.status) {
			res.status(201).json(result.data);
		} else {
			throw new Error(result.message);
		}
	} catch (error) {
		res.json({
			status: false,
			message: error.message,
		});
	}
});

app.get("/api/stations", async (req, res) => {
	try {
		const result = await getAllStations();
		console.log(result);
		if (result.status) {
			res.status(200).json({ stations: result.data });
		} else {
			throw new Error(result.message);
		}
	} catch (error) {
		res.json({
			status: false,
			message: error.message,
		});
	}
});

app.get("/api/stations/:id/trains", async (req, res) => {
	try {
		const station_id = req.params.id;
		console.log("Param: ", station_id);
		const result = await getAllTrains({ station_id });
		console.log(result);
		if (result.status) {
			res.status(200).json(
				result.data
			);
		} else {
			throw new Error(result.message);
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
});

app.get("/api/wallets/:id", async (req, res) => {
	try {
		const wallet_id = req.params.id;
		console.log("Param: ", wallet_id);
		const result = await getWalletBalance({ wallet_id });
		console.log(result);
		if (result.status) {
			res.status(200).json({ trains: result.data });
		} else {
			throw new Error(result.message);
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
});

app.post("/api/tickets", async (req, res) => {
	try {
		const info = req.body;
		console.log("Info: ", info);
		const result = await purchaseTicket({ info });
		console.log(result);
		if (result.status) {
			res.status(200).json({ result });
		} else {
			throw new Error(result.message);
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
});

app.put("/api/wallets/:id", checkAmount, async (req, res) => {
	try {
		const user_id = req.params.id;
		console.log("Param: ", user_id);
		console.log("Data: ", req.body);
		const result = await addWalletBalance({ user_id, ...req.body });
		console.log(result);
		if (result.status) {
			res.status(200).json(result.data);
		} else {
			throw new Error(result.message);
		}
	} catch (error) {
		res.status(404).json({
			message: error.message,
		});
	}
});

app.use((err, req, res, next) => {
	res.json({ message: err });
});

// listen for requests
app.listen(PORT, () => {
	db.sequelize
		.sync({ alter: true })
		.then(() => {
			console.log(`App listening to port ${PORT}`);
		})
		.catch((err) => {
			console.log(err.message);
		});
});
