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
	// console.log("provincial Reps", provincialReps[0]);
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
	/* position: relative; */
	/* align-items: center; */
	background-color: var(--color-white);
	border-radius: 8px;
	box-shadow: -7px 11px 9px -7px #311e10;
	/* padding: 10px; */
	margin-top: 30px;
	/* padding: 0px 10px 20px 5px; */
	/* margin-left: 30px; */
	/* min-width: 60%; */
`;
const TitleBox = styled.div`
	display: flex;
	justify-content: center;
	background-color: var(--color-red);
	width: 100%;
	padding: 10px;
	/* height: 30px; */
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	/* border-bottom: 2px solid var(--color-red); */
`;
const Title = styled.p`
	font-size: 40px;
	font-weight: 400;
	font-family: var(--font-heading);
	color: var(--color-white);
`;
const Container = styled.div`
	display: flex;
	flex-flow: wrap;
	justify-content: center;
	gap: 20px;
	padding: 10px;
	border-left: 3px solid var(--color-red);
	border-right: 3px solid var(--color-red);
	border-bottom: 3px solid var(--color-red);
	/* min-width: 60%; */
	color: white;
	/* padding:200px; */
`;
export default ProvincialRepsComponent;
