"use strict";
//import node-fetch
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

//THIS HANDLER GETS THE REPRESENTATIVES BASED ON THE LAT & LNG OF THE USER'S POSTAL CODE RETRIEVED IN THE getLatLng HANDLER.

const getRepresentatives = async (req, res) => {
	//get lat & lng from req.query
	const { lat, lng } = req.query;
	// console.log("req.query", req.query);

	try {
		//use lat & lng to get representatives data from Represent API and send back to frontend
		fetch(`https://represent.opennorth.ca/representatives/?point=${lat},${lng}`)
			.then((res) => res.json())
			.then((data) => {
				console.log("get Representatives data", data);
				const representatives = data;
				res.status(200).json({
					data: representatives,
				});
			});
		//catch errors if fetch fails
	} catch (err) {
		res.status(500).json({ status: 500, Message: err.Message });
	}
};

module.exports = { getRepresentatives };
