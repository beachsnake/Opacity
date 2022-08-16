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
import { motion } from "framer-motion";
import LoadingAnimation from "../LoadingAnimation";

export const RepProfileComponent = (rep) => {
	//import map shapes from context
	const {
		repsByLocation,
		allRepsBoundaryShapes,
		setRepBoundaryShape,
		setZoom,
		setNewCenter,
		userLocation,
		isOpen,
		setIsOpen,
	} = useContext(RepresentativesContext);

	const [image, setImage] = useState(rep?.rep?.photo_url);

	//Create state for expanding profile information
	// const [isOpen, setIsOpen] = useState(false);

	//Show loading screen if required data has not loaded into context
	if (allRepsBoundaryShapes === null || repsByLocation === null) {
		return <LoadingAnimation />;
	}
	//find boundary that matches representative
	const boundaryShape = allRepsBoundaryShapes.filter((shape) => {
		// console.log("shape.name", shape.name);
		return shape.name === rep?.rep?.district_name;
	});

	// Take first word from reps elected_office to sort reps for different map centers and zooms onClick
	const electedOffice = rep?.rep?.elected_office.split(" ")[0];

	//declare rep name to change map zoom of P.E.I. MLA & Newfoundland MHA, and Prime Minister
	const repName = rep?.rep?.name;

	//declare repSetName to change map zoom of Newfoundland Councillors
	const repSetName = rep?.rep?.representative_set_name;

	//This function changes the polygon, center, and zoom on the map on homepage to display the representatives electoral district, and reveals more information about the representative below their profile picture.

	const handleClick = (name) => {
		//set isOpen to opposit value to expand or collapse the rep information div
		isOpen === name ? setIsOpen(null) : setIsOpen(name);
		// console.log("isOpen in", isOpen);
		//check is rep is mayor and then change zoom accordingly
		electedOffice === "Maire" ||
		electedOffice === "Mayor" ||
		repName === "Dennis King" ||
		repName === "Heath MacDonald" ||
		repName === "Joanne Thompson" ||
		repSetName === "St. John's City Council"
			? setZoom(9.5)
			: electedOffice === "Prime"
			? setZoom(2.75)
			: setZoom(11);

		//check if rep is Prime Minister and adjust map center loacation accordingly
		electedOffice === "Prime"
			? setNewCenter(rep.rep.location)
			: setNewCenter(userLocation);

		//There is a routing problem for the boundary shape of the MHA of Newfoundland, so we will check if this rep is being clicked and change the routing accordingly:
		repName === "John Abbott"
			? setRepBoundaryShape(boundaryShape[0]?.simple_shape?.coordinates[3][0])
			: setRepBoundaryShape(boundaryShape[0]?.simple_shape?.coordinates[0][0]);
	};

	//Create string for mailto: email link to open email client when user clicks on email link.
	const mailTo = "mailto: " + rep?.rep?.email;

	// console.log("isOpen out", isOpen);
	return (
		<Wrapper
			layout
			transition={{ layout: { duration: 1.5, type: "spring" } }}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			style={{ borderRadius: "20px" }}
		>
			<RepType layout>{rep?.rep?.elected_office}</RepType>
			<ImgWrap layout>
				{rep?.rep?.photo_url?.length > 0 ? (
					<Img
						src={image}
						onError={(e) => {
							if (e.target.onerror === null) {
								setImage(profile);
							}
						}}
						alt={rep.rep.name}
					/>
				) : (
					<Img src={profile} alt={rep?.rep?.name} />
				)}
				<SeeInfo
					layout
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => handleClick(rep?.rep?.name)}
				>
					Representative Information
				</SeeInfo>
			</ImgWrap>
			{isOpen === rep?.rep?.name && (
				<RepInfo
					layout
					// transition={{ layout: { duration: 4, type: "spring" } }}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					key={rep?.rep?.name}
				>
					<DistrictName>
						<TitleSpan>District</TitleSpan>
						<Span>{rep?.rep?.district_name}</Span>
					</DistrictName>
					<ElectedBody>
						<TitleSpan>Elected to</TitleSpan>{" "}
						<Span>{rep?.rep?.representative_set_name}</Span>
					</ElectedBody>
					{rep?.rep?.party_name && (
						<Party>
							<TitleSpan>Party</TitleSpan>
							<Span>{rep?.rep?.party_name}</Span>
						</Party>
					)}
					<Website whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<RepWebsite href={rep?.rep?.url} target="_blank">
							Personal Website
						</RepWebsite>
					</Website>
					<EmailBox whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
						<Email
							style={{ color: "var(--color-light-blue)", marginBottom: "10px" }}
							href={mailTo}
						>
							Send an email!
						</Email>
						<Span>
							<FaMailBulk style={{ color: "var(--color-light-blue)" }} />
						</Span>
					</EmailBox>
					{rep?.rep?.extra.facebook && (
						<SocialMediaBox>
							<SocialMedia href={rep?.rep?.extra.facebook} target="_blank">
								<FaFacebook style={{ color: "var(--color-light-blue)" }} />:
								facebook
							</SocialMedia>
						</SocialMediaBox>
					)}
					{rep?.rep?.extra.twitter && (
						<SocialMediaBox>
							<SocialMedia href={rep?.rep?.extra.twitter} target="_blank">
								<FaTwitter style={{ color: "var(--color-light-blue)" }} />:
								Twitter
							</SocialMedia>
						</SocialMediaBox>
					)}
					<Offices key={v4()}>
						{rep?.rep?.offices.map((office, index) => {
							const tel = "tel:" + office.tel;
							const address =
								"https://www.google.com/maps/search/?api=1&query=" +
								`${office.postal}`;
							return (
								<>
									<OfficeSpan key={v4()}>Office {index + 1}</OfficeSpan>
									<Office key={v4()}>
										<PhoneNumber href={tel} target="_blank">
											<FaPhoneSquareAlt
												style={{ color: "var(--color-green)" }}
											/>
											: {office.tel}
										</PhoneNumber>
										{office.postal && (
											<OfficeBox key={v4()}>
												<OfficeAddress href={address} target="_blank">
													<FaMapMarkerAlt
														style={{ color: "var(--color-red)" }}
													/>
													: {office.postal}
												</OfficeAddress>
											</OfficeBox>
										)}
									</Office>
								</>
							);
						})}
					</Offices>
				</RepInfo>
			)}
			<RepType>{rep?.rep?.name}</RepType>
		</Wrapper>
	);
};

const Wrapper = styled(motion.div)`
	display: flex;
	position: relative;
	flex-direction: column;
	align-items: center;
	background-color: var(--color-white);
	width: 260px;
	border-radius: 8px;
	border-left: 2px solid var(--color-light-blue);
	border-right: 2px solid var(--color-light-blue);
	border-bottom: 2px solid var(--color-light-blue);
	overflow: hidden;
	height: fit-content;
`;
const RepType = styled(motion.p)`
	display: flex;
	justify-content: center;
	background-color: var(--color-light-blue);
	font-size: 18px;
	font-weight: 400;
	color: var(--color-white);
	padding: 10px;
	width: 100%;
	height: auto;
`;
const ImgWrap = styled(motion.div)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	width: 180px;
	padding-top: 10px;
	margin-bottom: 10px;
	background-color: var(--color-white);
`;
const Img = styled.img`
	border-radius: 4px;
	width: 120px;
`;
const SeeInfo = styled(motion.button)`
	text-decoration: none;
	background-color: var(--color-red);
	color: var(--color-white);
	border: none;
	border-radius: 4px;
	padding: 2px;
	margin-top: 10px;
	margin-bottom: 10px;
	width: 180px;
`;
const RepInfo = styled(motion.div)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 10px;
	padding: 10px;
	width: 250px;
	background-color: var(--color-white);
`;
const TitleSpan = styled.span`
	font-size: 16px;
	color: var(--color-light-blue);
	font-family: var(--font-heading);
	margin-bottom: 10px;
	border-bottom: 1px solid var(--color-light-blue);
`;
const Span = styled.p`
	display: flex;
	justify-content: center;
	font-size: 15px;
	margin-bottom: 5px;
`;
const DistrictName = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 5px;
`;
const ElectedBody = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 5px;
`;
const Party = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 5px;
`;
const Website = styled(motion.div)`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 5px;
`;
const RepWebsite = styled.a`
	font-size: 16px;
	color: var(--color-light-blue);
	font-family: var(--font-heading);
	margin-bottom: 10px;
`;
const EmailBox = styled(motion.div)``;
const Email = styled(motion.a)`
	display: flex;
	flex-direction: column;
	align-items: center;
	font-family: var(--font-heading);
	margin-bottom: 10px;
	color: black;
`;
const Offices = styled.div`
	display: flex;
	flex-direction: column;
`;
const OfficeBox = styled.div``;
const OfficeSpan = styled.span`
	font-size: 16px;
	color: var(--color-light-blue);
	font-family: var(--font-heading);
	margin-bottom: 10px;
	margin-top: 10px;
	border-bottom: 1px solid var(--color-light-blue);
`;
const OfficeAddress = styled.a`
	color: black;
	&:hover {
		color: var(--color-light-blue);
	}
`;

const SocialMediaBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;
const SocialMedia = styled.a`
	margin-bottom: 10px;
	color: var(--color-black);

	&:hover {
		color: var(--color-light-blue);
	}
`;
const PhoneNumber = styled.a`
	color: black;
	&:hover {
		color: var(--color-light-blue);
	}
`;
const Office = styled.div``;
