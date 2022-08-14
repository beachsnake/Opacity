import React, { useContext, useState, useEffect } from "react";
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
import { motion } from "framer-motion";

export const RepProfileComponent = (rep) => {
	//import map shapes from context
	const {
		repsByLocation,
		allRepsBoundaryShapes,
		repBoundaryShape,
		setRepBoundaryShape,
		zoom,
		setZoom,
		setNewCenter,
		userLocation,
	} = useContext(RepresentativesContext);
	// console.log("allRepsBoundaryShapes", allRepsBoundaryShapes);
	// console.log("rep", rep.rep);
	// console.log(rep.rep.photo_url);
	//Create state for expanding profile information
	const [isOpen, setIsOpen] = useState(false);
	// console.log("isOpen", isOpen);

	//find boundary that matches representative
	if (allRepsBoundaryShapes === null || repsByLocation === null) {
		return <div>Loading...</div>;
	}

	const boundaryShape = allRepsBoundaryShapes.filter((shape) => {
		// console.log("shape.name", shape.name);
		return shape.name === rep?.rep?.district_name;
	});

	// Take first word from reps elected_office to sort reps for different map centers and zooms onClick
	const electedOffice = rep?.rep?.elected_office.split(" ")[0];
	const electedOfficeLength = rep?.rep?.elected_office.split(" ")[0].length;

	//declare rep name to change map zoom of P.E.I. MLA & Newfoundland MHA
	const repName = rep?.rep?.name;
	// console.log("repName", repName);
	// console.log("boundaryShape", boundaryShape[0]?.simple_shape?.coordinates[0][0])
	//declare repSetName to change map zoom of Newfoundland Councillors
	const repSetName = rep?.rep?.representative_set_name;
	// console.log("repName", repName)

	const handleClick = () => {
		//set isOpen to opposit value to expand or collapse the rep information div
		setIsOpen(!isOpen);
		console.log("isOpen", isOpen);
		console.log("zoom", zoom);
		// console.log("e.target", e);
		//check is rep is mayor and then change zoom accordingly
		electedOffice === "Maire" ||
		electedOffice === "Mayor" ||
		repName === "Dennis King" ||
		repName === "Heath MacDonald" ||
		repName === "Joanne Thompson" ||
		repSetName === "St. John's City Council"
			? setZoom(9)
			: electedOffice === "Prime"
			? setZoom(3)
			: setZoom(11);

		//check if rep is Prime Minister and adjust map center loacation accordingly
		electedOffice === "Prime"
			? setNewCenter(rep.rep.location)
			: setNewCenter(userLocation);

		//There is a routing problem for the boundary shape of the MHA of Newfoundland, so we will check if this rep is being clicked and change the routing accordingly:
		repName === "John Abbott"
			? setRepBoundaryShape(boundaryShape[0]?.simple_shape?.coordinates[3][0])
			: setRepBoundaryShape(boundaryShape[0]?.simple_shape?.coordinates[0][0]);

		// if (e.target.innerText.split(" ")[0] === electedOffice) {
		// 	setIsOpen(!isOpen);
		// }
		// const eventTarget = e.target.innerText.split("");
		// const newTarget = e.target.innerText.includes(electedOffice);
		// if (newTarget) {
		// 	setIsOpen(!isOpen);
		// }
		// console.log("newEventTarget", newTarget);
		// // console.log("e.target", e.target.innerText.split(""));
		// console.log("electedOffice", electedOfficeLength);
	};
	//Create string for mailto: email link to open email client when user clicks on email link.
	const mailTo = "mailto: " + rep?.rep?.email;

	return (
		<Wrapper
			layout
			transition={{ layout: { duration: 2.5, type: "spring" } }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			style={{ borderRadius: "8px" }}
			// onClick={() => handleClick()}
		>
			<RepType layout>
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
			<ImgWrap layout>
				{rep?.rep?.photo_url?.length > 0 ? (
					<Img src={rep.rep.photo_url} alt={rep.rep.name} />
				) : (
					<Img src={profile} alt={rep?.rep?.name} />
				)}
				<SeeInfo layout whileTap={{ scale: 0.9 }} onClick={() => handleClick()}>
					More information
				</SeeInfo>
			</ImgWrap>
			{isOpen === true && (
				<RepInfo
					layout
					// transition={{ layout: { duration: 4, type: "spring" } }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					key={rep?.rep?.name}
				>
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
			)}
		</Wrapper>
	);
};

const Wrapper = styled(motion.div)`
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
	overflow: hidden;
	/* box-shadow: -7px 11px 9px -7px #311e10; */
`;
const RepType = styled(motion.p)`
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
const ImgWrap = styled(motion.div)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	width: 180px;
	/* height: 180px; */
	padding-top: 10px;
	margin-bottom: 10px;
	/* border-radius: 4px; */
	background-color: var(--color-white);
`;
const Img = styled.img`
	border-radius: 4px;
	/* height: auto; */
	width: 120px;
`;
const SeeInfo = styled(motion.button)`
	text-decoration: none;
	background-color: var(--color-white);
	border-radius: 4px;
	padding: 2px;
	margin-top: 10px;
	margin-bottom: 10px;
	width: 180px;
	color: black;
`;
const RepInfo = styled(motion.div)`
	display: flex;
	flex-direction: column;
	margin-bottom: 10px;
	padding: 10px;
	width: 250px;
	background-color: var(--color-white);
`;
const Span = styled.span`
	font-weight: bold;
`;
const Name = styled(motion.p)`
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
