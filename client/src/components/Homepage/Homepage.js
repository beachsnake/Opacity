import React, { useContext } from "react";
import styled from "styled-components";
import { RepresentativesContext } from "../Context/RepresentativeContext";
import ProvincialRepsComponent from "./ProvincialRepsComponent";
import FederalRepComponent from "./FederalRepComponent";
import MunicpalRepComponent from "./MunicpalRepComponent";
import MapComponent from "./MapComponent";
import LoadingAnimation from "../LoadingAnimation";

const Homepage = () => {
	//import relevant data from RepresentativesContext
	const { repsByLocation } = useContext(RepresentativesContext);

	//Check to see if repsByLocation has not loaded, or page was reloaded.
	if (repsByLocation === null) {
		return <LoadingAnimation />;
	}

	//NOTES ON ORGANIZATION:
	//Each branch of government has it's own component which renders the relevant representative's information for that branch inside it's own container.

	return (
		<Wrapper>
			<MapWrapper>
				<MapComponent />
			</MapWrapper>
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
	position: relative;
	flex-direction: column;
	align-items: center;
	width: clamp(50%, 75vw, 90%);
`;
const MapWrapper = styled.div`
	margin-top: 30px;
	border: 3px solid var(--color-light-blue);
	padding: 10px;
	border-radius: 8px;
	z-index: 2;
`;
const Container = styled.div`
	display: flex;
	justify-content: center;
`;

export default Homepage;
