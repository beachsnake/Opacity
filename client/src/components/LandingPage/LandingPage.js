import React, { useContext } from "react";
import styled from "styled-components";
import { useState } from "react";
import { RepresentativesContext } from "../Context/RepresentativeContext";
import { useNavigate } from "react-router-dom";

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
				setUserLocation(response);
				setNewCenter(response);
				console.log("newCenter", newCenter);
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
			<Instructions>
				<Title>Welcome to Opacity!</Title>
				<StyledP>
					Please enter your postal code to find your representatives:
				</StyledP>
			</Instructions>

			<FormWrapper>
				<FormTitle></FormTitle>
				{/* <AddressForm onSubmit={(ev) => submitFunc(ev)}> */}
				<AddressForm onSubmit={(ev) => handleChange(ev, postalCode)}>
					<PostalCode
						type="text"
						onChange={(ev) => setPostalCode(ev.target.value.toUpperCase())}
						// onChange={(ev) => handleChange(ev.target.value)}
						value={postalCode}
						placeholder="ex: K1A 0A6"
						required
					/>
					{validPostal.test(postalCode) ? (
						<Submit
							type="submit"
							disabled={false}
							style={{ cursor: "pointer" }}
						/>
					) : (
						<>
							<Submit
								type="submit"
								disabled={true}
								style={{ cursor: "not-allowed" }}
							/>
						</>
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
	/* background-color: var(--color-light-green); */
	/* border: solid 2px green; */
`;
const Instructions = styled.div`
	display: flex;
	flex-direction: column;
	/* margin-left: -200px; */
	padding: 20px;
	box-shadow: -7px 11px 9px -7px #311e10;
	background-color: var(--color-white);
	border-radius: 8px;
`;
const Title = styled.p`
	margin-bottom: 10px;
	font-weight: 400;
	font-size: 20px;
`;
const StyledP = styled.div`
	font-family: "Poppins", sans-serif;
	font-weight: 100;
`;
const FormWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-content: center;
	margin-top: 20px;
	padding: 20px;
	box-shadow: -7px 11px 9px -7px #311e10;
	/* border: 1px solid var(--color-black); */
	border-radius: 8px;
	width: 400px;
	background-color: white;
`;
const FormTitle = styled.p`
	font-size: large;
`;
const AddressForm = styled.form`
	display: flex;
	flex-direction: column;
	padding: 10px;
`;
const PostalCode = styled.input`
	color: black;
	border: 1px solid grey;
	border-radius: 8px;
	margin-bottom: 20px;
	height: 30px;
`;
const Submit = styled.input`
	background-color: var(--color-red);
	font-size: 20px;
	border: none;
	border-radius: 8px;
	height: 30px;
`;
export default LandingPage;
