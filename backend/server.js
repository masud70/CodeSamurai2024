require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const { checkValidity } = require("./middlewares");
const {
	welcome,
	addUser,
	addStation,
	addTrain,
	getAllStations,
	getAllTrains,
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
		// console.log(result);
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
