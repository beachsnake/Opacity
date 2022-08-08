import React, { useContext } from "react";
import styled from "styled-components";
import { useState } from "react";
import { RepresentativesContext } from "../Context/RepresentativeContext";
import { useNavigate } from "react-router-dom";

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
				// setStatus("success");
				// setSubmit(true);
				// localStorage.setItem("reservation", JSON.stringify(response.data));
				nav(`/homepage`);
			})
			.catch((error) => {
				console.error("Error:", error);
				// setStatus("error");
			});
	};

	return (
		<Wrapper>
			LandingPage
			<FormWrapper>
				<FormTitle>
					Please enter your postal code to find your representatives:
				</FormTitle>
				<AddressForm onSubmit={(ev) => submitFunc(ev)}>
					<PostalCode
						type="text"
						onChange={(ev) => setPostalCode(ev.target.value)}
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
	background-color: lightgrey;
	border: solid 2px green;
`;
const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	border: 2px solid red;
	width: 400px;
`;
const FormTitle = styled.p``;
const AddressForm = styled.form`
	display: flex;
	display: flex;
	flex-direction: column;
`;
const PostalCode = styled.input``;
const Submit = styled.input``;
export default LandingPage;
