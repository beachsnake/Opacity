"use strict";
//import node fetch
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

//USE UUID TO GENERATE ID NUMBERS FOR RESPONSES
const { v4: uuidv4 } = require("uuid");

const getBoundaryShape = async (req, res) => {
	//get lat & lng from req.query
	// const { lat, lng } = req.query;

	try {
		await fetch(
			`https://represent.opennorth.ca/boundaries/quebec-electoral-districts-2017/lassomption/simple_shape`
		);
		// const response = await fetch(
		// 	`https://represent.opennorth.ca/boundaries/nova-scotia-electoral-districts/cape-breton-centre/simple_shape
		//     `
		// );
		// console.log(response)
		const data = await res.json();

		// console.log("data", data);
		const boundaries = data;
		res.status(200).json({
			data: boundaries,
		});
		//catch errors if fetch fails
	} catch (err) {
		console.log(err.stack);
		res.status(500).json({ status: 500, Message: err.Message });
	}
};

module.exports = { getBoundaryShape };
