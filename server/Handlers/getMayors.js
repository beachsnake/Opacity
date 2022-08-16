//Import MongoDB
const { MongoClient } = require("mongodb");
//Get API Key
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

//THIS HANDLER RETRIEVES THE DATASET FROM THE MAYORS DB I CREATED AND BATCHIMPORTED INTO MONGODB

const getMayors = async (req, res) => {
	//create new client
	const client = new MongoClient(MONGO_URI, options);
	try {
		//connect to client
		await client.connect();

		//connect to database
		const db = client.db("opacity");

		//grabbing from the collection
		const result = await db.collection("mayors").find().toArray();
		console.log(result);

		//response
		result
			? res.status(200).json({ status: 200, data: result })
			: req
					.status(404)
					.json({ status: 404, message: "Not found", data: result });
	} catch (err) {
		res.status(500).json({ status: 500, data: req.body, message: err.message });

		// close the connection to the database server
	} finally {
		client.close();
	}
};

module.exports = { getMayors };
