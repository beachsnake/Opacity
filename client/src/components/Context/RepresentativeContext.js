import { createContext, useEffect, useState } from "react";

export const RepresentativesContext = createContext();

export const RepresentativesProvider = ({ children }) => {
	const [premiers, setPremiers] = useState(null);
	const [mayors, setMayors] = useState(null);
	const [userLocation, setUserLocation] = useState(null);
	const [repsByLocation, setRepsByLocation] = useState(null);
	const [allRepsBoundaryShapes, setAllRepsBoundaryShapes] = useState(null);
	const [repBoundaryShape, setRepBoundaryShape] = useState(null);
	const [getRepsStatus, setRepsStatus] = useState("Loading");

	//Context & fetches to retrieve information we need from Mongo
	useEffect(() => {
		const fetchFunc = async () => {
			try {
				//get premiers
				const getPremiers = await fetch("/api/get-premiers");
				const premiersData = await getPremiers.json();
				// console.log("premiersData", premiersData);
				setPremiers(premiersData.data[0].premiers);
				//get mayors
				const getMayors = await fetch("/api/get-mayors");
				const mayorsData = await getMayors.json();
				// console.log("mayorsData", mayorsData);
				setMayors(mayorsData.data[0].mayors);
			} catch (err) {
				setRepsStatus("Error");
			}
		};
		fetchFunc();
	}, []);

	//Second useEffect that will fetch representatives based on user's location. This is triggered when user submit's postal code on LandingPage
	useEffect(() => {
		//get representatives based on userLocation when userLocation available
		const fetchFunc = async () => {
			try {
				//get representatives by lat & lng recieved from user's postal code
				const getRepsByLocaiton = await fetch(
					`/api/get-representatives?lat=${userLocation.lat}&lng=${userLocation.lng}`
				);
				const repsData = await getRepsByLocaiton.json();
				// console.log("repsData", repsData);
				//put data into state
				setRepsByLocation(repsData.data.objects);

				//get representatives' electoral boundary sets by lat & lng recieved from user's postal code
				const getRepsBoundarySets = await fetch(
					`/api/get-boundary-shape?lat=${userLocation?.lat}&lng=${userLocation?.lng}`
				);
				const repsBoundaries = await getRepsBoundarySets.json();
				// console.log("repsBoundaries", repsBoundaries);
				setAllRepsBoundaryShapes(repsBoundaries.data.objects);
				setRepBoundaryShape(repsBoundaries.data.objects);
				setRepsStatus("Idle");
			} catch (err) {
				setRepsStatus("Error");
			}
		};
		fetchFunc();
	}, [userLocation]);

	//CONSOLE LOGS
	// console.log("premiers", premiers);
	// console.log("mayors", mayors);
	// console.log("userLocation", userLocation?.lat)
	// console.log("allRepsBoundaryShapes", allRepsBoundaryShapes)
	// console.log("repBoundaryShape", repBoundaryShape);

	//Catch errors if fetch fails
	if (setRepsStatus === "Error") {
		return <>Error</>;
	}

	if (premiers === null || mayors === null) {
		return <div>Loading...</div>;
	}

	return (
		<RepresentativesContext.Provider
			value={{
				premiers,
				setPremiers,
				mayors,
				setMayors,
				userLocation,
				setUserLocation,
				repsByLocation,
				setRepsByLocation,
				allRepsBoundaryShapes,
				setAllRepsBoundaryShapes,
				repBoundaryShape,
				setRepBoundaryShape,
			}}
		>
			{children}
		</RepresentativesContext.Provider>
	);
};
