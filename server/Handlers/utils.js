//function to create googleMaps Client
const createMapsClient = () => {
	const { Client } = require("@googlemaps/google-maps-services-js");
	require("dotenv").config();
	const { GOOGLE_MAPS_API_KEY } = process.env;
	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	return new MapsClient(GOOGLE_MAPS_API_KEY, options);
};
// function to create MongoDb client
const createMongoClient = () => {
	const { MongoClient } = require("mongodb");
	require("dotenv").config();
	const { MONGO_URI } = process.env;
	const options = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	return new MongoClient(MONGO_URI, options);
};

module.exports = { createMongoClient, createMapsClient };
