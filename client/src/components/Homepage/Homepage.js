import React, { useContext } from 'react'
import styled from 'styled-components'
import { RepresentativesContext } from '../Context/RepresentativeContext'

//TODO 
//* Different maps for each Level of government to keep Titles/Seperators
const Homepage = () => {
    const{premiers, mayors, repsByLocation, userLocation} = useContext(RepresentativesContext);
console.log("repsByLocation",repsByLocation)

  return (
    <Wrapper>
        <Map></Map>
        {repsByLocation.map((rep) => {
    })} 
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
  )
}

const Wrapper = styled.div``;
const Map = styled.div``;
const Municipal = styled.div``;
const Provincial = styled.div``;
const Federal = styled.div``;
const Premier = styled.div``;
const PrimeMinister = styled.div``;

export default Homepage