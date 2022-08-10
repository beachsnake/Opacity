"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");

//REQUIRE/IMPORT HANDLERS
const { getRepresentatives } = require("./Handlers/getRepresentatives");
const { getBoundaries } = require("./Handlers/getBoundaries.js");
const {getBoundaryShape} = require("./Handlers/getBoundaryShape.js")
const { getLatLng } = require("./Handlers/getLatLng.js");
const { getRepsByName } = require("./Handlers/getRepsByName.js");
const { getPremiers } = require("./Handlers/getPremiers.js");
const { getMayors } = require("./Handlers/getMayors.js");

express()
	// Below are methods that are included in express(). We chain them for convenience.
	// -------------------------------------------------------------------------------

	// This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
	.use(morgan("tiny"))
	.use(express.json())

	// Any requests for static files will go into the public folder
	.use(express.static("public"))

	// ---------------------------------

	//* GET
	//GET electoral boundaries
	.get("/api/get-boundaries", getBoundaries)
	//GET electoral boundary shapes
	// .get("/api/boundary-shape", getBoundaryShape)
	//GET Representatives by lat/long
	.get("/api/get-representatives", getRepresentatives)
	//GET Representatives by name
	.get("/api/get-representatives-by-name", getRepsByName)
	//GET Premiers from MongoDB
	.get("/api/get-premiers", getPremiers)
	//GET Mayors from MongoDB
	.get("/api/get-mayors", getMayors)

	//*POST
	//find lat/long by Postalcode OR address.
	.post("/api/get-latlong", getLatLng)
	// .post("/api/add-user", createUser)

	// .get("/api/get-user", getUserInfo)

	// .delete("/api/delete-user/:userId", deleteUser)

	// ---------------------------------

	// this is our catch all endpoint.
	.get("*", (req, res) => {
		res.status(404).json({
			status: 404,
			message: "This is obviously not what you are looking for.",
		});
	})

	// Node spins up our server and sets it to listen on port 8000.
	.listen(8000, () => console.log(`Listening on port 8000`));
