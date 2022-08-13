//TODO DYNAMIC MAP
//? TODO userLocation is default for center of map on Homepage load.
//? TODO create new useState to change map in Context
//? TODO filter through data in repProfileComponent to find correct boundary data and setState
//? TODO create useEffect in Map that has this state as a dependency
//? TODO make paths variable dynamic enough to load any shape data that is sent to it.
//? TODO in RepProfileComponent make onClick in Wrapper that changes the state in Context that changes the map.
//TODO IF REPRESENTATIVE HAS NO COORDINATES, SET DEFAULT TO MAYOR'S BOUNDARYSET OR SOMETHING ELSE.
//TODO FIX BUG IN CALGARY AND REGINA WHERE REP IMG NOT FOUND. SHOULD REVERT TO DEFAULT PROFILE PIC.
//TODO IF THERE ARE NO REPRESENTATIVES IN BRANCH OF GOVERNMENT, DISPLAY ERROR MESSAGE OR DISPLAY NOTHING.

//TODO Limit number of local reps shown to 4 or 5. Make the rest visible by clicking on a tab that shows you the rest.

//TODO MAKE SURE PROVINCIAL POLYGONS ARE WORKING:
// === polygons are working:
//? === polygons AND zoom working
//Make zoom revert to userLocation on unMount

//"Quebec" H2V4J1,
//"Alberta" T1Y 7J9,
//"Ontario" M5J 0A1,
//"Nova Scotia" B3J 1Y4,change zoom to be closer
//"New Brunswick" E1C 0R9, change zoom to be closer
//"Manitoba" R2M 3T9,
//"British Columbia" V8T1Y3, FIND POLYGON FOR ISLANDS AND ADD THEM
//"Prince Edward Island" C0A 1Y0, Zoom for Federal MP needs to be lower
//duplicate Provincial MLA/Premier bug needs to be fixed?
//"Saskatchewan" S4P 0P9 MLA boundary doesn't exist. set default to local mayor
//"Newfoundland and Labrador" A1C 1G9 Councillor zoom should be same as Mayor
//*TERRITORIES - currently not able to find representatives with postal code. Check to see if address works better.
// "Yukon" Y1A 2A7;
// "Nunavut" X0A 0H0;
// "Nortwest Territories" X1A 2R3;
