import { GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";
import { useContext, useState, useEffect } from "react";
import React from "react";
import { RepresentativesContext } from "../Context/RepresentativeContext";

//TODO FIGURE OUT HOW TO IMPORT API KEY FROM ENV SO IT DOESN'T GET SENT TO GIT
//TODO make color of polygon change based on party affiliation

const MapComponent = () => {
	//create state for map
	const [map, setMap] = useState(null);
	//get userLocation and electoral boundaries from RepresentativesContext
	const { userLocation, allRepsBoundaryShapes, repBoundaryShape } = useContext(
		RepresentativesContext
	);

	//   useEffect(() => {
	//     const repBoundary = allRepsBoundaryShapes[0]?.simple_shape?.coordinates[0];
	//   }, [allRepsBoundaryShapes])

	// if(allRepsBoundaryShapes === null){
	//     <>Loading..</>
	// }
	// console.log("userLocation", userLocation)

	//*CREATE MAP

	//get API key from .env
	const mapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
	// console.log("mapsKey", mapsKey);

	//Styling for Map
	const containerStyle = {
		width: "400px",
		height: "400px",
		borderRadius: "4px",
	};
	//default starting position of map set to userLoacation
	const center = {
		lat: userLocation.lat,
		lng: userLocation.lng,
	};
	//start map script and use API key
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: mapsKey,
	});

	//FORMAT REPRESENTATIVE BOUNDARY DATA FROM CONTEXT AND USE IN POLYGON IN MAP

	//create empty array to put formatted coordinates
	const boundaryArr = [];
	//map though coordinates array and create new objects in this format: {lat: lat, lng: lng } and shift them into boundaryArr

	console.log("repBoundaryShape", repBoundaryShape);
	const repBoundary = repBoundaryShape?.simple_shape?.coordinates[0][0].map(
		(coordinate) => {
			// console.log("coordinate", coordinate);
			const latLngObj = { lat: coordinate[1], lng: coordinate[0] };
			// console.log("latLngObj", latLngObj);
			return boundaryArr.unshift(latLngObj);
		}
	);

	console.log("boundaryArr", boundaryArr);

	console.log("repBoundary", repBoundary);
	console.log(
		"allRepsBoundaryShapes",
		allRepsBoundaryShapes[0].simple_shape.coordinates[0]
	);

	//define polygon styling
	const options = {
		fillColor: "blue",
		fillOpacity: 0.4,
		strokeColor: "white",
		strokeOpacity: 1,
		strokeWeight: 2,
		clickable: false,
		draggable: false,
		editable: false,
		geodesic: false,
		zIndex: 1,
	};

	// const onLoad = React.useCallback(function callback(map) {
	// 	const bounds = new window.google.maps.LatLngBounds(center);
	// 	map.fitBounds(bounds);
	// 	setMap(map);
	// }, []);

	// const onUnmount = React.useCallback(function callback(map) {
	// 	setMap(null);
	// }, []);

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={12}
			// onLoad={onLoad}
			// onUnmount={onUnmount}
		>
			<Polygon paths={boundaryArr} options={options} />
		</GoogleMap>
	) : (
		<></>
	);
};

export default MapComponent;
