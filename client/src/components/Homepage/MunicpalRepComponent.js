import React, { useContext } from "react";
import { RepresentativesContext } from "../Context/RepresentativeContext";
import styled from "styled-components";
import { RepProfileComponent } from "./RepProfileComponent";

const MunicpalRepComponent = () => {
	//get user's local representatives
	const { repsByLocation, mayors } = useContext(RepresentativesContext);
	//Filter for municipal representatives. need to exclude MPP, MNA, MLA, and MP
	const MunicipalReps = repsByLocation.filter((rep) => {
		console.log("repFilter", rep.elected_office);
		return rep.elected_office.length > 3;
	});
	console.log("MunicipalReps", MunicipalReps);
	return (
		<Wrapper>
			<TitleBox>
				<Title>Municipal</Title>
			</TitleBox>
			<Container>
				{MunicipalReps.map((rep) => {
					// console.log("rep", rep);
					return <RepProfileComponent rep={rep} />;
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
export default MunicpalRepComponent;
