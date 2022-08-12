import { GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";
import { useContext, useState, useEffect } from "react";
import React from "react";
import { RepresentativesContext } from "../Context/RepresentativeContext";

//TODO make color of polygon change based on party affiliation
/* eslint-disable no-undef */
/* global google */

//Styling for Map
const containerStyle = {
	minWidth: "73vw",
	height: "50vh",
	borderRadius: "8px",
};

const MapComponent = () => {
	//create state for map
	const [map, setMap] = useState(null);
	//get userLocation and electoral boundaries from RepresentativesContext
	const {
		userLocation,
		allRepsBoundaryShapes,
		repBoundaryShape,
		zoom,
		newCenter,
	} = useContext(RepresentativesContext);
	// console.log(userLocation);
	//*CREATE MAP

	//get API key from .env
	const mapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
	// console.log("mapsKey", mapsKey);

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
	//FORMAT REPRESENTATIVE BOUNDARY DATA FROM CONTEXT AND USE IN POLYGON IN MAP

	//map though coordinates array and create new objects in this format: {lat: lat, lng: lng }
	const repBoundary = repBoundaryShape
		? repBoundaryShape.map((coordinate) => {
				// console.log("coordinate", coordinate);
				const latLngObj = { lat: coordinate[1], lng: coordinate[0] };
				// console.log("latLngObj", latLngObj);
				return latLngObj;
		  })
		: [{ lat: 0, lng: 0 }];

	//*CONSOLE LOGS
	console.log("repBoundary", repBoundary);
	// console.log("boundaryArr", boundaryArr);
	// console.log("repBoundary", repBoundary);
	// console.log(
	// 	"allRepsBoundaryShapes",
	// 	allRepsBoundaryShapes[0].simple_shape.coordinates[0]
	// );

	const onLoad = React.useCallback(
		function callback(map) {
			map = new window.google.maps.LatLngBounds(center);
			// map.fitBounds(bounds);
			setMap(map);
		},
		[repBoundaryShape]
	);

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			center={center}
			zoom={zoom}
			// mapId="6ca0558664ecf852"
			onLoad={onLoad}
			// onUnmount={onUnmount}
		>
			<Polygon paths={repBoundary} options={options} />
		</GoogleMap>
	) : (
		<></>
	);
};

export default MapComponent;
