import React, { useContext } from "react";
import styled from "styled-components";
import { useState } from "react";
import { RepresentativesContext } from "../Context/RepresentativeContext";
import { useNavigate } from "react-router-dom";

//TODO make input display error if not formatted correctly, Or if repsByLocation is empty array

const LandingPage = () => {
	//import userLocation from Context
	const { userLocation, setUserLocation } = useContext(RepresentativesContext);
	//create state for form value:
	const [postalCode, setPostalCode] = useState("");
	//declare variable for useNavigate
	let nav = useNavigate();

	//create submit function to POST postal code to backend and get lat & lng, and province for Homepage
	const submitFunc = (ev) => {
		ev.preventDefault();
		// navigate(`/confirmed`);
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
				// console.log("response", response);
				setUserLocation(response);
				nav(`/homepage`);
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	};

	return (
		<Wrapper>
			<Instructions>
				<Title>Welcome to Opacity!</Title>
				<StyledP></StyledP>
			</Instructions>

			<FormWrapper>
				<FormTitle>
					Please enter your postal code to find your representatives:
				</FormTitle>
				<AddressForm onSubmit={(ev) => submitFunc(ev)}>
					<PostalCode
						type="text"
						onChange={(ev) => setPostalCode(ev.target.value.toUpperCase())}
						value={postalCode}
						placeholder="ex: K1A 0A6"
					/>
					{postalCode === "" ? (
						<Submit
							type="submit"
							disabled={true}
							style={{ cursor: "not-allowed" }}
						/>
					) : (
						<Submit
							type="submit"
							disabled={false}
							style={{ cursor: "pointer" }}
						/>
					)}
				</AddressForm>
			</FormWrapper>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-width: 60%;
	min-height: 100vh;
	/* background-color: lightgrey; */
	/* border: solid 2px green; */
`;
const Instructions = styled.div`
	display: flex;
`;
const Title = styled.p`
	margin: 20px;
	font-size: 20px;
`;
const StyledP = styled.div``;
const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	margin-top: 20px;
	padding: 20px;
	/* border: 2px solid red; */
	border-radius: 8px;
	width: 400px;
	height: 300px;
	background-color: white;
`;
const FormTitle = styled.p`
	font-size: large;
	margin-bottom: 50px;
`;
const AddressForm = styled.form`
	display: flex;
	flex-direction: column;
`;
const PostalCode = styled.input`
	color: black;
	border: 1px solid grey;
	border-radius: 4px;
	margin-bottom: 20px;
	height: 30px;
`;
const Submit = styled.input`
	background-color: var(--color-red);
	border: none;
	border-radius: 4px;
	height: 30px;
`;
export default LandingPage;
