import React, { useContext } from "react";
import styled from "styled-components";
import { RepresentativesContext } from "../Context/RepresentativeContext";
import { RepProfileComponent } from "./RepProfileComponent";
import { v4 as uuidv4, v4 } from "uuid";

//TODO Create profile for PM that uses info from premiers

const FederalRepComponent = () => {
	//get user's local representatives
	const { repsByLocation, premiers } = useContext(RepresentativesContext);
	//Filter for provincial representatives. need to iclude MPP, MNA, MLA
	const federalReps = repsByLocation.filter((rep) => {
		return rep.elected_office === "MP";
	});
    //Create profile for Federal PM by filtering through premiers DB I created in MongoDB
    const primeMinister = premiers.filter((premier) => {
        // console.log("premier", premier)
        return premier.name === "Justin Trudeau"
    })
    // console.log(primeMinister[0])    
	return (
		<Wrapper>
			<TitleBox>
				<Title>Federal</Title>
			</TitleBox>
			<Container>
				{federalReps.map((rep) => {
					// console.log("rep", rep);
					return <RepProfileComponent key={v4()} rep={rep} />;
				})}
                <RepProfileComponent rep={primeMinister[0]}/>
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
export default FederalRepComponent;
