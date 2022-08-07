"use strict";
const { MongoClient } = require("mongodb");
require("dotenv").config();
//import node-fetch
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
	const { lat, lng } = req.query;
	console.log("req.query", req.query);
	// fetch(
	// 	"https://represent.opennorth.ca/representatives/?point=45.5279592,-73.6145719"
	// )
	fetch(`https://represent.opennorth.ca/representatives/?point=${lat},${lng}`)
		.then((res) => res.json())
		.then((data) => {
			console.log("get Representatives data", data);
			const representatives = data;
			res.status(200).json({
				data: representatives,
			});
		});
};

module.exports = { getRepresentatives };
