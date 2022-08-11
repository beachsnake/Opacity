//Import MongoDB
const { MongoClient } = require("mongodb");
//Import data
// const representativeBios = require("./server/data/representativeBios.json");
const premiers = require("./server/data/premiers.json");
const mayors = require("./server/data/mayors.json");
// const {provinces} = require("./server/data/provinces.js");
// const provincesGeoJSON = require("./server/data/canada_provinces.geojson")
//Get API Key
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

const batchImport = async () => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		// connect
		await client.connect();
		console.log("connected");
		// declare db
		const db = client.db("opacity");
		// import data
		// const result = await db
		// 	.collection("representatives")
		// 	.insertMany(representativeBios);
		// console.log("representatives", result);

		//import premiers
		const result = await db.collection("premiers").insertMany(premiers);
		console.log("premiers", result);
		//import mayor information
		const result2 = await db.collection("mayors").insertMany(mayors);
		console.log("mayors", result2);
		// //import province polygons
		// const result3 = await db.collection("provinces").insertMany(provinces);
		// console.log("provinces", result3);

		// if (result.acknowledged === true && result2.acknowledged === true) {
		// 	console.log("success");
		// } else {
		// 	console.log("failure");
		// }
	} catch (err) {
		console.log(err.message);
	} finally {
		client.close();
		console.log("disconnected");
	}
};

batchImport();
