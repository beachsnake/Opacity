import React, { useContext, useState } from "react";
import styled from "styled-components";
import {
	FaFacebook,
	FaTwitter,
	FaMailBulk,
	FaPhoneSquareAlt,
	FaMapMarkerAlt,
} from "react-icons/fa";
import { v4 as uuidv4, v4 } from "uuid";
import { RepresentativesContext } from "../Context/RepresentativeContext";
import profile from "../../../src/Imgs/profile.jpeg";

export const RepProfileComponent = (rep) => {
	//import map shapes from context
	const {
		repsByLocation,
		allRepsBoundaryShapes,
		repBoundaryShape,
		setRepBoundaryShape,
		setZoom,
		setNewCenter,
		userLocation,
	} = useContext(RepresentativesContext);
	// console.log("allRepsBoundaryShapes", allRepsBoundaryShapes)
	// console.log("rep",rep.rep.district_name)
	// console.log(rep.rep.name)
	//find boundary that matches representative
	if (allRepsBoundaryShapes === null || repsByLocation === null) {
		return <div>Loading...</div>;
	}

	const boundaryShape = allRepsBoundaryShapes.filter((shape) => {
		// console.log("shape.name", shape.name);
		return shape.name === rep?.rep?.district_name;
	});

	// console.log(rep.rep.photo_url.length)

	// Take first word from reps elected_office to sort reps for different map centers and zooms onClick 
	const electedOffice = rep?.rep?.elected_office.split(" ")[0];

	const handleClick = () => {
		//check is rep is mayor and then change zoom accordingly
		electedOffice === "Maire" || electedOffice === "Mayor"
			? setZoom(9)
			: electedOffice === "Prime"
			? setZoom(3)
			: setZoom(11);
		//check if rep is Prime Minister and adjust map center loacation accordingly
		electedOffice === "Prime"
			? setNewCenter(rep.rep.location)
			: setNewCenter(userLocation);
		setRepBoundaryShape(boundaryShape[0]?.simple_shape?.coordinates[0][0]);
	};
	//Create string for mailto: email link to open email client when user clicks on email link.
	const mailTo = "mailto: " + rep?.rep?.email;

	return (
		<Wrapper onClick={() => handleClick()}>
			<RepType>
				{rep?.rep?.elected_office}
				{rep?.rep?.elected_office.includes("Premier") ||
				rep?.rep?.elected_office.includes("Prime") ? (
					<></>
				) : (
					<>
						<RepSpan> of </RepSpan>
						{rep?.rep?.district_name}
					</>
				)}
			</RepType>
			<ImgWrap>
				{rep?.rep?.photo_url?.length > 0 ? (
					<Img src={rep.rep.photo_url} alt={rep.rep.name} />
				) : (
					<Img src={profile} alt={rep?.rep?.name} />
				)}
			</ImgWrap>
			<RepInfo>
				<Name>
					<Span>Name:</Span>
					{rep?.rep?.name}
				</Name>
				<Name>
					<Span>District: </Span>
					{rep?.rep?.district_name}
				</Name>
				<ElectedBody>
					<Span>Elected to:</Span> {rep?.rep?.representative_set_name}
				</ElectedBody>
				<Party>
					<Span>Party Afilliation:</Span> {rep?.rep?.party_name}
				</Party>
				<Email href={mailTo}>
					<FaMailBulk /> Send them an email!
				</Email>
				{rep?.rep?.extra.facebook && (
					<SocialMediaBox>
						<SocialMedia href={rep?.rep?.extra.facebook}>
							<FaFacebook />: facebook
						</SocialMedia>
					</SocialMediaBox>
				)}
				{rep?.rep?.extra.twitter && (
					<SocialMediaBox>
						<SocialMedia href={rep?.rep?.extra.twitter}>
							<FaTwitter />: Twitter
						</SocialMedia>
					</SocialMediaBox>
				)}
				<Offices>
					{rep?.rep?.offices.map((office) => {
						const tel = "tel:" + office.tel;
						// console.log("tel",tel,"office.tel", office.tel)
						return (
							<Office key={v4()}>
								<PhoneNumber a={tel}>
									<FaPhoneSquareAlt />: {office.tel}
								</PhoneNumber>
								{office.postal && (
									<StyledP>
										<FaMapMarkerAlt />: {office.postal}
									</StyledP>
								)}
							</Office>
						);
					})}
				</Offices>
			</RepInfo>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: center;
	background-color: var(--color-white);
	min-width: 250px;
	/* height: auto; */
	/* min-width: 100px; */
	margin: 0px;
	border-radius: 8px;
	border: 3px solid var(--color-black);
	/* box-shadow: -7px 11px 9px -7px #311e10; */
`;
const RepType = styled.p`
	display: flex;
	justify-content: center;
	background-color: var(--color-white);
	font-size: 18px;
	font-weight: 400;
	color: var(--color-black);
	padding: 10px;
	width: 100%;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
`;
const RepSpan = styled.span`
	color: var(--color-black);
	margin-left: 3px;
	margin-right: 3px;
`;
const ImgWrap = styled.div`
	width: 180px;
	/* height: 180px; */
	padding-top: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	/* border-radius: 4px; */
	background-color: var(--color-white);
`;
const Img = styled.img`
	border-radius: 4px;
	height: auto;
	width: 120px;
`;
const RepInfo = styled.div`
	display: flex;
	flex-direction: column;
	padding: 10px;
	width: 250px;
	background-color: var(--color-white);
`;
const Span = styled.span`
	font-weight: bold;
`;
const Name = styled.p`
	margin-bottom: 5px;
`;
const ElectedBody = styled.p`
	margin-bottom: 5px;
`;
const Party = styled.p`
	margin-bottom: 5px;
`;
const Email = styled.a`
	margin-bottom: 5px;
	color: black;
	&:hover {
		color: var(--color-light-blue);
	}
`;
const Offices = styled.div`
	display: flex;
	flex-direction: column;
`;
const SocialMediaBox = styled.div``;
const SocialMedia = styled.a`
	color: var(--color-black);

	&:hover {
		color: var(--color-light-blue);
	}
`;
const PhoneNumber = styled.a`
	color: black;
`;
const StyledP = styled.p``;
const Office = styled.div``;
