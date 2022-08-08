"use strict";
//import node-fetch
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

//USE UUID TO GENERATE ID NUMBERS FOR RESPONSES
const { v4: uuidv4 } = require("uuid");

const getRepsByName = async (req, res) => {
	//get lat & lng from req.query
	const { lat, lng } = req.query;
	// console.log("req.query", req.query);

	try {
		//use lat & lng to get representatives data from Represent API and send back to frontend
		fetch(`https://represent.opennorth.ca/representatives/?last_name=Stewart

        `)
			.then((res) => res.json())
			.then((data) => {
				console.log("get Representatives data", data);
				const representative = data;
				res.status(200).json({
					data: representative,
				});
			});
		//catch errors if fetch fails
	} catch (err) {
		res.status(500).json({ status: 500, Message: err.Message });
	}
};

module.exports = { getRepsByName };
