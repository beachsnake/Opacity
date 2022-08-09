import React, { useContext } from 'react'
import { RepresentativesContext } from '../Context/RepresentativeContext'

const MunicpalRepComponent = () => {
    //get user's local representatives
    const{repsByLocation, mayors} = useContext(RepresentativesContext);

  return (
    <div>MunicpalRepComponent</div>
  )
}

export default MunicpalRepComponent