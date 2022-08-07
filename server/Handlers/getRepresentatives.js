"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
//USE UUID TO GENERATE ID NUMBERS FOR RESPONSES
const { v4: uuidv4 } = require("uuid");

const getRepresentatives = async (req, res) => {
	fetch("https://represent.opennorth.ca/representatives/?point=45.524,-73.596")
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			const boundaries = data;
			res.status(200).json({
				data: boundaries,
			});
		});
};

module.exports = { getRepresentatives };
