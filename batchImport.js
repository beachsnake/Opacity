//Import MongoDB
const { MongoClient } = require("mongodb");
//Import data
const premiers = require("./server/data/premiers.json");
const mayors = require("./server/data/mayors.json");

//Get API Key
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

//THIS FILE BATCH IMPORTS THE MAYORS AND PREMIERS DATASETS I CREATED INTO MONGODB.

const batchImport = async () => {
	const client = new MongoClient(MONGO_URI, options);
	try {
		// connect
		await client.connect();
		console.log("connected");
		// declare db
		const db = client.db("opacity");

		//import premiers
		const result = await db.collection("premiers").insertMany(premiers);
		console.log("premiers", result);
		//import mayor information
		const result2 = await db.collection("mayors").insertMany(mayors);
		console.log("mayors", result2);
	} catch (err) {
		console.log(err.message);
	} finally {
		client.close();
		console.log("disconnected");
	}
};

batchImport();
