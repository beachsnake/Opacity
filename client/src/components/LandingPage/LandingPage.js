import React, { useContext } from "react";
import styled from "styled-components";
import { useState } from "react";
import { RepresentativesContext } from "../Context/RepresentativeContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

//TODO make input display error if not formatted correctly, Or if repsByLocation is empty array

const LandingPage = () => {
	//import userLocation from Context
	const { userLocation, setUserLocation, newCenter, setNewCenter } = useContext(
		RepresentativesContext
	);
	//create state for form value:
	const [postalCode, setPostalCode] = useState("");
	// console.log("postalCode", postalCode);
	//declare variable for useNavigate
	let nav = useNavigate();
	//declare RegExp
	const validPostal = new RegExp(
		/^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
	);

	//create submit function to POST postal code to backend and get lat & lng, and province for Homepage
	const submitFunc = (ev) => {
		ev.preventDefault();
		fetch("/api/get-latlong", {
			method: "POST",
			body: JSON.stringify({
				postalCode: postalCode,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((res) => res.json())
			.then((response) => {
				console.log("response", response);
				//sets local storage
				localStorage.setItem("userLocation", JSON.stringify(response));
				localStorage.setItem("newCenter", JSON.stringify(response));
				setNewCenter(response);
				setUserLocation(response);
				console.log("newCenter landing page", newCenter);
				console.log("userLocation landing page", userLocation);
				nav(`/homepage`);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	//Create a handler to check that the postal code entered is formatted correctly:
	const handleChange = (ev, postalCode) => {
		// console.log(validPostal.test(postalCode));
		if (validPostal.test(postalCode)) {
			submitFunc(ev);
		} else {
			setPostalCode("");
		}
	};
	return (
		<Wrapper>
			<TitleBox>
				<Title>Make your government less opaque!</Title>
			</TitleBox>
			<Container>
				<StyledP>
					Please enter your postal code to find your representatives:
				</StyledP>

				<FormTitle></FormTitle>
				<AddressForm onSubmit={(ev) => handleChange(ev, postalCode)}>
					<PostalCode
						type="text"
						onChange={(ev) => setPostalCode(ev.target.value.toUpperCase())}
						value={postalCode}
						placeholder="ex: K1A 0A6"
						required
					/>
					{validPostal.test(postalCode) ? (
						<Submit
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
							type="submit"
							disabled={false}
							style={{ cursor: "pointer" }}
						/>
					) : (
						<>
							<Submit
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								type="submit"
								disabled={true}
								style={{ cursor: "not-allowed" }}
							/>
						</>
					)}
				</AddressForm>
			</Container>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: clamp(50%, 75vw, 90%);
	min-height: 100vh;
	/* background-color: var(--color-light-green); */
	/* border: solid 2px green; */
`;
const Instructions = styled.div`
	display: flex;
	flex-direction: column;
	/* margin-left: -200px; */
	padding: 20px;
	background-color: var(--color-white);
	border-radius: 8px;
	box-shadow: -7px 11px 9px -7px #311e10;
`;
const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
	padding: 10px;
	width: 60%;
	border-left: 3px solid var(--color-light-blue);
	border-right: 3px solid var(--color-light-blue);
	border-bottom: 3px solid var(--color-light-blue);
	color: white;
	width: clamp(50%, 75vw, 90%);
`;
const TitleBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	background-color: var(--color-light-blue);
	padding: 10px;
	border-top-left-radius: 8px;
	border-top-right-radius: 8px;
	border: 2px solid var(--color-light-blue);
	width: clamp(50%, 75vw, 90%);
`;
const Title = styled.p`
	/* justify-content: center; */
	font-size: 30px;
	font-weight: 400;
	font-family: var(--font-heading);
	color: var(--color-white);
`;
const StyledP = styled.div`
	font-family: "Poppins", sans-serif;
	font-weight: 100;
`;
const FormTitle = styled.p`
	font-size: large;
`;
const AddressForm = styled.form`
	display: flex;
	flex-direction: column;
	padding: 10px;
`;
const PostalCode = styled(motion.input)`
	font-family: var(--font-body);
	color: black;
	border: 1px solid grey;
	border-radius: 8px;
	margin-bottom: 20px;
	height: 30px;
`;
const Submit = styled(motion.input)`
	background-color: var(--color-red);
	color: var(--color-white);
	font-family: var(--font-heading);
	font-size: 20px;
	border: none;
	border-radius: 8px;
	height: 30px;
`;
export default LandingPage;
