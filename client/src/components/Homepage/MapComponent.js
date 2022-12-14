import { GoogleMap, Polygon, useJsApiLoader } from "@react-google-maps/api";
import { useContext, useState } from "react";
import React from "react";
import { RepresentativesContext } from "../Context/RepresentativeContext";

//Didn't have time to finalize custom map styling, but will keep here so I can keep working on it after the presentation.
import { mapStyles } from "../mapStyles";

/* eslint-disable no-undef */
/* global google */

//Styling for Map
const containerStyle = {
	minWidth: "73vw",
	height: "50vh",
	borderRadius: "8px",
};

const MapComponent = () => {
	//create state for map. Not currently used but I plan on using it to solve some map reloading issues after graduating the bootcamp.
	const [map, setMap] = useState(null);

	//get userLocation and electoral boundaries from RepresentativesContext
	const {
		userLocation,
		allRepsBoundaryShapes,
		repBoundaryShape,
		zoom,
		newCenter,
	} = useContext(RepresentativesContext);

	//*CREATE MAP

	//get API key from .env
	const mapsKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

	//default starting position of map set to userLoacation
	const center = {
		lat: newCenter?.lat,
		lng: newCenter?.lng,
	};

	//start map script and use API key
	const { isLoaded } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: mapsKey,
	});

	//define map and polygon styling
	const options = {
		//unfinished map styling
		// styles: mapStyles,

		//polygon styling
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
				const latLngObj = { lat: coordinate[1], lng: coordinate[0] };
				return latLngObj;
		  })
		: [{ lat: 0, lng: 0 }];

	// Not currently used but I plan on using it to solve some map reloading issues after graduating the bootcamp.
	const onLoad = React.useCallback(
		function callback(map) {
			map = new window.google.maps.LatLngBounds(center);
			// map.fitBounds(bounds);
			setMap(map);
		},
		[repBoundaryShape]
	);

	return isLoaded ? (
		<>
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={zoom}
				// options={options}
				// onLoad={onLoad}
				// onUnmount={onUnmount}
			>
				<Polygon paths={repBoundary} options={options} />
			</GoogleMap>
		</>
	) : (
		<></>
	);
};

export default MapComponent;
