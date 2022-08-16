import React, { useContext } from "react";
import styled from "styled-components";
import { RepresentativesContext } from "../Context/RepresentativeContext";
import { RepProfileComponent } from "./RepProfileComponent";
import { PremierProfileComponent } from "./PremierProfileComponent";
import { v4 as uuidv4, v4 } from "uuid";

//TODO Create profile for Premier that uses info from premiers

const ProvincialRepsComponent = () => {
	//get user's local representatives from context
	const { repsByLocation, premiers, userLocation } = useContext(
		RepresentativesContext
	);

	//Filter for provincial representatives. need to iclude MPP, MNA, MLA and MHA
	const provincialReps = repsByLocation.filter((rep) => {
		return (
			rep.elected_office === "MNA" ||
			rep.elected_office === "MPP" ||
			rep.elected_office === "MLA" ||
			rep.elected_office === "MHA"
		);
	});

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
				{/* {provincialReps.map((rep) => {
					return <RepProfileComponent key={v4()} rep={provincialReps[0]} />;
				})} */}
				<RepProfileComponent key={v4()} rep={provincialReps[0]} />
				{/* <RepProfileComponent rep={premier} /> */}
				<PremierProfileComponent key={v4()} rep={premier} />
			</Container>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: var(--color-white);
	border-radius: 8px;
	box-shadow: -7px 11px 9px -7px #311e10;
	margin-top: 30px;
`;
const TitleBox = styled.div`
	display: flex;
	justify-content: center;
	background-color: var(--color-red);
	width: 100%;
	padding: 10px;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
`;
const Title = styled.p`
	@media (max-width: 768px) {
		font-size: 36px;
	}
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
	color: white;
`;
export default ProvincialRepsComponent;
