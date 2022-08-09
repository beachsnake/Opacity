import React, { useContext } from "react";
import styled from "styled-components";
import { RepresentativesContext } from "../Context/RepresentativeContext";
import { RepProfileComponent } from "./RepProfileComponent";

//TODO
//* Different maps for each Level of government to keep Titles/Seperators
const Homepage = () => {
	const { premiers, mayors, repsByLocation, userLocation } = useContext(
		RepresentativesContext
	);
	console.log("repsByLocation", repsByLocation);
    if(repsByLocation === null){
        return <div>Loading..</div>
    }

	return (
		<Wrapper>
			<Map></Map>
			<Container>{repsByLocation?.map((rep) => {
                return <RepProfileComponent rep={rep}/>
            })}</Container>

			<>
				<Municipal></Municipal>
				<Provincial>
					<Premier></Premier>
				</Provincial>
				<Federal>
					<PrimeMinister></PrimeMinister>
				</Federal>
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
