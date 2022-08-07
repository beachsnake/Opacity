//import createMapsClient to create a maps client
const { createMapsClient } = require("./utils");
//create maps client
const client = createMapsClient();
//import uuid to create ids for responses
const { v4: uuidv4 } = require("uuid");

const getLatLng = async () => {};

module.exports = { getLatLng }