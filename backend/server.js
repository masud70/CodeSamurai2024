require("dotenv").config();
const express = require("express");
const cors = require("cors");
const db = require("./models");
const { addPoint, centerOfGravity } = require("./controllers/Problem1");
const { isAnyPointExistCheck } = require("./middlewares/Mock");
const app = express();

const PORT = process.env.NODE_DOCKER_PORT || 5000;
var corsOptions = {
	origin: "*",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
	res.json({ message: "Welcome to CU_CODECONQUEST." });
});
app.put("/p1", isAnyPointExistCheck, async (req, res) => {
	console.log("Input: ", req.body);
	const result = await addPoint({ point: req.body });
	console.log("Output: ", result);
	res.json(result);
});
app.get("/p2", async (req, res) => {
	const response = await centerOfGravity();
	console.log(response);
	res.status(200).json(response.data || { x: 0, y: 0 });
});

// listen for requests
app.listen(PORT, () => {
	db.sequelize
		.sync({ alter: true })
		.then(() => {
			console.log(
				`================================
App listening to port ${PORT}
Database connection successfully
================================`
			);
		})
		.catch((err) => {
			console.log(err.message);
		});
});
