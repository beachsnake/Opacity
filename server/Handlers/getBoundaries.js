"use strict";
//import node fetch
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

//USE UUID TO GENERATE ID NUMBERS FOR RESPONSES
const { v4: uuidv4 } = require("uuid");

const getBoundaries = async (req, res) => {
	//get lat & lng from req.query
	const { lat, lng } = req.query;
	// console.log(req.query)

	try {
		fetch(`https://represent.opennorth.ca/boundaries?contains=${lat},${lng}`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				const boundaries = data;
				res.status(200).json({
					data: boundaries,
				});
			});
		//catch errors if fetch fails
	} catch (err) {
		res.status(500).json({ status: 500, Message: err.Message });
	}
};

module.exports = { getBoundaries };
