import React, { useContext } from "react";
import styled from "styled-components";
import { RepresentativesContext } from "../Context/RepresentativeContext";
import { RepProfileComponent } from "./RepProfileComponent";
import { v4 as uuidv4, v4 } from "uuid";

//TODO Create profile for Premier that uses info from premiers

const ProvincialRepsComponent = () => {
	//get user's local representatives
	const { repsByLocation, premiers, userLocation } = useContext(RepresentativesContext);
    console.log("userLocation", userLocation)
	//Filter for provincial representatives. need to iclude MPP, MNA, MLA
	const provincialReps = repsByLocation.filter((rep) => {
		return (
			rep.elected_office === "MNA" ||
			rep.elected_office === "MPP" ||
			rep.elected_office === "MLA" ||
			rep.elected_office === "MHA"
		);
	});
    //Create profile for Provincial Premier by filtering through premiers DB I created in MongoDB
    const premier = premiers.filter((premier) => {
        
    })
	// console.log("provincialReps",provincialReps);
	return (
		<Wrapper>
			<TitleBox>
				<Title>Provincial</Title>
			</TitleBox>
			<Container>
				{provincialReps.map((rep) => {
					// console.log("rep", rep);
					return <RepProfileComponent key={v4()} rep={rep} />;
				})}
			</Container>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const TitleBox = styled.div`
	border-bottom: 2px solid black;
`;
const Title = styled.p`
	font-size: 20px;
`;
const Container = styled.div`
	display: flex;
	flex-flow: wrap;
	justify-content: center;
	gap: 20px;
	color: white;
`;
export default ProvincialRepsComponent;
