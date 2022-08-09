import React, { useContext } from "react";
import { RepresentativesContext } from "../Context/RepresentativeContext";

const ProvincialRepsComponent = () => {
	//get user's local representatives
	const { repsByLocation, premiers } = useContext(RepresentativesContext);
	return <div>ProvincialRepsComponent</div>;
};

export default ProvincialRepsComponent;
