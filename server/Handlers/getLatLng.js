//import Google Maps Client
const { Client } = require("@googlemaps/google-maps-services-js");
//import node-fetch
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

//import axios
const axios = require("axios").default;
//import createMapsClient to create a maps client
// const { createMapsClient } = require("./utils");
//create maps client
// const client = createMapsClient();
//import uuid to create ids for responses
const { v4: uuidv4 } = require("uuid");

const getLatLng = async (req, res) => {
	//deconstruct req.body so it can be used in fetch
	const { postalCode, address } = req.body;
	// console.log("address", address);

	try {
		//*node-fetch

		//*get lat/lng from google maps address from frontend.(More precise location)
		// fetch(
		// 	`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBkVnkDdCXLFa1LVHt6toeEPtpbmJNXuOI`
		// )
		// .then((res) => res.json())
		// 	.then((data) => {
		// 		console.log("data", data.results[0].geometry.location);
		// 		const latLng = data.results[0].geometry.location;
		// 		res.status(200).json({
		// 			data: latLng,
		// 		});
		//     });

		//*get lat/lng from google maps using postal code from frontend(Less precise location)
		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode},CA&key=AIzaSyBkVnkDdCXLFa1LVHt6toeEPtpbmJNXuOI`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log("data", data.results[0].geometry.location);
				const latLng = data.results[0].geometry.location;
				res.status(200).json({
					data: latLng,
				});
			});

		//catch any errors and return info/message
	} catch (err) {
		res.status(500).json({ status: 500, Message: err.Message });

		// close the connection to the database server
	}
	// finally {
	// 	client.close();
	// }
};

module.exports = { getLatLng };
