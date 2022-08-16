import React, { useContext } from "react";
import styled from "styled-components";
import { RepresentativesContext } from "../Context/RepresentativeContext";
import { RepProfileComponent } from "./RepProfileComponent";
import { v4 as uuidv4, v4 } from "uuid";
import { motion } from "framer-motion";

//TODO Create profile for PM that uses info from premiers

const FederalRepComponent = () => {
	//get user's local representatives
	const { repsByLocation, premiers } = useContext(RepresentativesContext);
	//Filter for provincial representatives. need to iclude MPP, MNA, MLA
	const federalRep = repsByLocation.filter((rep) => {
		// return rep.elected_office === "MP";
		return rep.representative_set_name === "House of Commons";
	});
	// console.log("federalReps",federalRep)

	//Create profile for Federal PM by filtering through premiers DB I created in MongoDB
	const primeMinister = premiers.filter((premier) => {
		// console.log("premier", premier)
		return premier.name === "Justin Trudeau";
	});
	// console.log(primeMinister[0])
	return (
		<Wrapper>
			<TitleBox>
				<Title>Federal</Title>
			</TitleBox>
			<Container>
				<RepProfileComponent key={v4()} rep={federalRep[0]} />
				<RepProfileComponent key={v4()} rep={primeMinister[0]} />
			</Container>
			<ElectionBox>
				<ElectionInfo>
					Next election is on {primeMinister[0]?.election_info?.election_date}
				</ElectionInfo>
				<ElectionInfo>
					Register to vote{" "}
					<AnchorButton whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<ElectionAnchor
							href={primeMinister[0]?.election_info?.election_website}
							target="_blank"
						>
							Here
						</ElectionAnchor>
					</AnchorButton>
				</ElectionInfo>
			</ElectionBox>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	background-color: var(--color-white);
	border-radius: 20px;
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
	font-size: 40px;
	font-weight: 400;
	font-family: var(--font-heading);
	color: var(--color-white);
`;
const ElectionBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: var(--color-red);
	width: 100%;
	padding: 15px;
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
`;
const ElectionInfo = styled.p`
	@media (max-width: 768px) {
		font-size: 30px;
	}
	font-size: 26px;
	font-weight: 400;
	font-family: var(--font-heading);
	color: var(--color-white);
`;
const ElectionAnchor = styled.a`
	font-size: 26px;
	color: var(--color-white);
	font-family: var(--font-heading);
	margin-bottom: 10px;
`;
const AnchorButton = styled(motion.button)`
	text-decoration: none;
	border: none;
	background: none;
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
export default FederalRepComponent;
