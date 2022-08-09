import React, { useContext } from "react";
import styled from "styled-components";
import { RepresentativesContext } from "../Context/RepresentativeContext";
import { RepProfileComponent } from "./RepProfileComponent";
import ProvincialRepsComponent from "./ProvincialRepsComponent";
import { v4 as uuidv4, v4 } from "uuid";
import FederalRepComponent from "./FederalRepComponent";
import MunicpalRepComponent from "./MunicpalRepComponent";

//TODO
//* Different maps for each Level of government to keep Titles/Seperators

const Homepage = () => {
	//import relevant data from RepresentativesContext
	const { premiers, mayors, repsByLocation, userLocation } = useContext(
		RepresentativesContext
	);
	console.log("repsByLocation", repsByLocation);
	//Check to see if repsByLocation has not loaded, or page was reloaded.
	if (repsByLocation === null) {
		return (
			<div>
				No Representatives found. Please click on on the Opacity logo and input
				a valid postal code, or sign up to stop seeing this message.{" "}
			</div>
		);
	}

	return (
		<Wrapper>
			<Map></Map>
			<>
				<Container>
                    <MunicpalRepComponent />
                </Container>
				<Container>
                   <ProvincialRepsComponent /> 
				</Container>
				<Container>
					<FederalRepComponent />
				</Container>
			</>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const Container = styled.div`
	display: flex;
	flex-flow: wrap;
	justify-content: center;
	gap: 20px;
	color: white;
`;
const Map = styled.div``;
const Municipal = styled.div``;
const Provincial = styled.div``;
const Federal = styled.div``;
const Premier = styled.div``;
const PrimeMinister = styled.div``;

export default Homepage;
