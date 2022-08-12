import React, { useContext } from "react";
import { RepresentativesContext } from "../Context/RepresentativeContext";
import styled from "styled-components";
import { RepProfileComponent } from "./RepProfileComponent";
import { v4 as uuidv4, v4 } from "uuid";

const MunicpalRepComponent = () => {
	//get user's local representatives
	const { repsByLocation, mayors } = useContext(RepresentativesContext);
	//Filter for municipal representatives. need to exclude MPP, MNA, MLA, and MP
	const MunicipalReps = repsByLocation.filter((rep) => {
		// console.log("repFilter", rep.elected_office);
		return rep.elected_office.length > 3;
	});
	// console.log("MunicipalReps", MunicipalReps);
	return (
		<Wrapper>
			<TitleBox>
				<Title>Municipal</Title>
			</TitleBox>
			<Container>
				{MunicipalReps.map((rep) => {
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
	position: relative;
	/* align-items: center; */
	background-color: var(--color-white);
	border-radius: 8px;
	box-shadow: -7px 11px 9px -7px #311e10;
	padding: 30px;
	margin-top: 30px;
	/* margin-left: 30px; */
	min-width: 60%;
`;
const TitleBox = styled.div`
	margin-bottom: 20px;
	/* min-width: 60%; */
	/* border-bottom: 2px solid black; */
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
	/* min-width: 60%; */
	color: white;
	/* padding:200px; */
`;
export default MunicpalRepComponent;
