import { createContext, useEffect, useState } from "react";

export const RepresentativesContext = createContext();

export const RepresentativesProvider = ({ children }) => {
    const [premiers, setPremiers] = useState(null);
    const [mayors, setMayors] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [repsByLocation, setRepsByLocation] = useState(null);
    const [getRepsStatus, setRepsStatus] = useState("Loading");

    //Context & fetches to retrieve information we need from Mongo and Represent API

    useEffect(() => {
        const fetchFunc = async () => {
            try{
                //get premiers 
                const getPremiers = await fetch("/api/get-premiers");
                const premiersData = await getPremiers.json();
                console.log("premiersData",premiersData);
                setPremiers(premiersData);
                //get mayors
                const getMayors = await fetch("/api/get-mayors");
                const mayorsData = await getMayors.json();
                console.log("mayorsData", mayorsData);
                setMayors(mayorsData);
                //get representatives based on userLocation
                const getRepsByLocaiton = await fetch(`https://represent.opennorth.ca/representatives/?point=${userLocation.lat},${userLocation.lng}`)
                const repsData = await getRepsByLocaiton.json();
                console.log("repsData", repsData);
                setRepsByLocation(repsData);
                setRepsStatus("Idle")

            } catch(err) {
                setRepsStatus("Error");
            }
        };
        fetchFunc();
    }, []);

    //Catch errors if fetch fails
    if(setRepsStatus === "Error"){
        return <>Error</>;
    }

    if (premiers === null || mayors === null || repsByLocation === null) {
        return <div>Loading...</div>
    }

    return (
        <RepresentativesContext.Provider
            value={{
                premiers,
                setPremiers,
                mayors,
                setMayors,
                userLocation,
                setUserLocation,
                repsByLocation,
                setRepsByLocation,
            }}
            >
                {children}
            </RepresentativesContext.Provider>
    );
};
