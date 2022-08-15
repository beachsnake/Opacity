import React, { useContext } from "react";
import styled from "styled-components";
import { RepresentativesContext } from "../Context/RepresentativeContext";
import { RepProfileComponent } from "./RepProfileComponent";
import { PremierProfileComponent } from "./PremierProfileComponent";
import { v4 as uuidv4, v4 } from "uuid";

//TODO Create profile for Premier that uses info from premiers

const ProvincialRepsComponent = () => {
	//get user's local representatives
	const { repsByLocation, premiers, userLocation } = useContext(
		RepresentativesContext
	);

	//Filter for provincial representatives. need to iclude MPP, MNA, MLA
	const provincialReps = repsByLocation.filter((rep) => {
		return (
			rep.elected_office === "MNA" ||
			rep.elected_office === "MPP" ||
			rep.elected_office === "MLA" ||
			rep.elected_office === "MHA"
		);
	});
	console.log("provincial Reps", provincialReps[0]);
	//Create profile for Provincial Premier by filtering through premiers DB I created in MongoDB
	const premier = premiers.find((premier) => {
		// console.log("premier",premier)
		return premier.elected_office.includes(userLocation.province);
	});
	// console.log(premier)
	return (
		<Wrapper>
			<TitleBox>
				<Title>Provincial</Title>
			</TitleBox>
			<Container>
				{provincialReps.map((rep) => {
					return <RepProfileComponent key={v4()} rep={provincialReps[0]} />;
				})}
				{/* <RepProfileComponent rep={premier} /> */}
				<PremierProfileComponent rep={premier} />
			</Container>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	/* align-items: center; */
	background-color: var(--color-white);
	border-radius: 8px;
	box-shadow: -7px 11px 9px -7px #311e10;
	padding: 30px;
	margin-top: 30px;
`;
const TitleBox = styled.div`
	margin-bottom: 20px;
`;
const Title = styled.p`
	font-size: 20px;
	font-weight: 400;
`;
const Container = styled.div`
	display: flex;
	flex-flow: wrap;
	justify-content: center;
	gap: 20px;
	color: white;
`;
export default ProvincialRepsComponent;
