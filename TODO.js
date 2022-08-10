
//TODO DYNAMIC MAP
//TODO userLocation is default for center of map on Homepage load.
//TODO create new useState to change map in Context
//TODO filter through data in repProfileComponent to find correct boundary data and setState 
//TODO create useEffect in Map that has this state as a dependency
//TODO make paths variable dynamic enough to load any shape data that is sent to it.
//TODO in RepProfileComponent make onClick in Wrapper that changes the state in Context that changes the map.



//TODO Need to find way to save userLocation on Refresh.

//TODO FIND OUT HOW TO GET LIST OF PMS OR MAYORS.
//* MAKE A GET AND SEARCH BY elected_office
// /representatives/house-of-commons/?elected_office=titlegoeshere
//could use this to create DB of mayors and premiers.

//* make a GET to search for reps by name and then individually copy paste them into a data file, add a bio section to the data and batchImport them into MongoDB.


//data template
// {
//     "firstName":"",
//     "surname":"",
//     "email":"",
//     "bio":""
//   }