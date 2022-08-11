import React, { useContext, useEffect } from "react";
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

export const RepProfileComponent = (rep) => {
	//import map shapes from context
	const { allRepsBoundaryShapes, repBoundaryShape, setRepBoundaryShape } =
		useContext(RepresentativesContext);
	// console.log("allRepsBoundaryShapes", allRepsBoundaryShapes)
	// console.log("rep",rep.rep.district_name)

	//find boundary that matches representative

	if (allRepsBoundaryShapes === null) {
		return <div>Loading...</div>;
	}

	const boundaryShape = allRepsBoundaryShapes.filter((shape) => {
		// console.log("shape.name", shape.name);
		return shape.name === rep.rep.district_name;
	});
	// console.log("BoundaryShape", boundaryShape[0]);

	//Create string for mailto: email link
	const mailTo = "mailto: " + rep.rep.email;


	return (
		<Wrapper onClick={() => setRepBoundaryShape(boundaryShape[0])}>
			<RepType>
				{rep.rep.elected_office}
				{rep.rep.elected_office.includes("Premier") ||
				rep.rep.elected_office.includes("Prime") ? (
					<></>
				) : (
					<>
						<RepSpan> of </RepSpan>
						{rep.rep.district_name}
					</>
				)}
			</RepType>
			<ImgWrap>
				<Img src={rep.rep.photo_url} alt={rep.rep.name} />
			</ImgWrap>
			<RepInfo>
				<Name>
					<Span>Name:</Span>
					{rep.rep.name}
				</Name>
				<ElectedBody>
					<Span>Elected to:</Span> {rep.rep.representative_set_name}
				</ElectedBody>
				<Party>
					<Span>Party Afilliation:</Span> {rep.rep.party_name}
				</Party>
				<Email href={mailTo}>
					<FaMailBulk /> Send them an email!
				</Email>
				{rep.rep.extra.facebook && (
					<SocialMedia>
						<FaFacebook />: {rep.rep.extra.facebook}
					</SocialMedia>
				)}
				{rep.rep.extra.twitter && (
					<SocialMedia>
						<FaTwitter />: {rep.rep.extra.twitter}
					</SocialMedia>
				)}
				<Offices>
					{rep.rep.offices.map((office) => {
						const tel = "tel:" + office.tel;
						console.log("tel",tel,"office.tel", office.tel)
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
	flex-direction: column;
	align-items: center;
	background-color: var(--color-light-blue);
	width: 180px;
	/* height: auto; */
	/* min-width: 100px; */
	margin: 0px;
	border-radius: 4px;
`;
const RepType = styled.p`
	background-color: var(--color-dark-blue);
	color: var(--color-white);
	padding: 10px;
	width: 180px;
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
`;
const RepSpan = styled.span`
	color: white;
`;
const ImgWrap = styled.div`
	width: 180px;
	height: 180px;
	padding-top: 10px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	background-color: var(--color-light-blue);
`;
const Img = styled.img`
	border-radius: 4px;
	height: auto;
	width: 120px;
`;
const RepInfo = styled.div`
	/* display: flex; */
	/* flex-direction: column; */
	padding: 5px;
	width: 180px;
	background-color: var(--color-light-blue);
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
`;
const SocialMedia = styled.p``;
const Offices = styled.div`
	display: flex;
	flex-direction: column;
`;
const PhoneNumber = styled.a`
color: black;
`;
const StyledP = styled.p``;
const Office = styled.div``;
