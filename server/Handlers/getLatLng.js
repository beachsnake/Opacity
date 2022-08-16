//import Google Maps Client
const { Client } = require("@googlemaps/google-maps-services-js");
//import node-fetch
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));

const getLatLng = async (req, res) => {
	//deconstruct req.body so it can be used in fetch
	const { postalCode, address } = req.body;
	// console.log("address", address);

	try {

		//*get lat/lng from google maps using postal code from frontend
		fetch(
			`https://maps.googleapis.com/maps/api/geocode/json?address=${postalCode},CA&key=AIzaSyBkVnkDdCXLFa1LVHt6toeEPtpbmJNXuOI`
		)
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				//Filter through data to find name of Province. We need this string in the frontend to render the provincial premier associated with the postal code.

				//create array of province names to use in .find()
				const provArr = [
					"Quebec",
					"Alberta",
					"Ontario",
					"Nova Scotia",
					"New Brunswick",
					"Manitoba",
					"British Columbia",
					"Prince Edward Island",
					"Saskatchewan",
					"Newfoundland and Labrador",
				];

				//search through response data for province name
				const findProvince = data.results[0].address_components.find(
					(province) => {
						return provArr.includes(province.long_name);
					}
				);

				//save lat, lng, and province data into variables
				const lat = data.results[0].geometry.location.lat;
				const lng = data.results[0].geometry.location.lng;

				res.status(200).json({
					lat: lat,
					lng: lng,
					province: findProvince.long_name,
				});
			});

		//catch any errors and return info/message
	} catch (err) {
		res.status(500).json({ status: 500, Message: err.Message });
	}
};

module.exports = { getLatLng };

//*get lat/lng from google maps address from frontend.(More precise location, but ultimately I decided to go with just using the postal code. I'm keeping this code here in case I'd like to change it in the future)
		// fetch(
		// 	`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBkVnkDdCXLFa1LVHt6toeEPtpbmJNXuOI`
		// )
		// 	.then((res) => res.json())
		// 	.then((data) => {
		// 		console.log("data", data.results[0]);
		// 		const latLng = data.results[0].geometry.location;
		// 		const lat = data.results[0].geometry.location.lat;
		// 		const lng = data.results[0].geometry.location.lng;
		// 		res.status(200).json({
		// 						lat: lat,
		// 			            lng: lng,
		// 		});
		// 	});
