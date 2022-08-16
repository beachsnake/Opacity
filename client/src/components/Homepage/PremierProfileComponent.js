import React, { useContext } from "react";
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

export const PremierProfileComponent = (rep) => {
	//import map shapes from context
	const { setRepBoundaryShape, setZoom, setNewCenter, isOpen, setIsOpen } =
		useContext(RepresentativesContext);

	//Create state for expanding profile information
	// const [isOpen, setIsOpen] = useState(false);

	//put premier's province in variable to change zoom based on province onClick
	const province = rep.rep.location.province;
	// console.log("rep", rep.rep.location.province);

	const handleClick = (name) => {
		//set isOpen to opposit value to expand or collapse the rep information div
		isOpen === name ? setIsOpen(null) : setIsOpen(name);
		setNewCenter(rep.rep.location);

		//Given the variety of sizes of each province, adjustments to the map zooms must be made on the following provinces:
		province === "Nova Scotia" || province === "New Brunswick"
			? setZoom(5.5)
			: province === "Prince Edward Island"
			? setZoom(7.5)
			: setZoom(3.75);

		//Sends the Premier's province's map polygon data to MapComponent to be reformatted and displayed on the map on the homepage.
		setRepBoundaryShape(rep.rep.geometry.coordinates);
	};

	//Create string for mailto: email link so it will open the user's email client onClick.
	const mailTo = "mailto: " + rep.rep.email;

	return (
		<Wrapper
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			style={{ borderRadius: "8px" }}
		>
			<RepType>{rep?.rep?.elected_office}</RepType>
			<ImgWrap>
				{rep?.rep?.photo_url?.length > 0 ? (
					<Img src={rep.rep.photo_url} alt={rep.rep.name} />
				) : (
					<Img src={profile} alt={rep?.rep?.name} />
				)}
				<SeeInfo
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => handleClick(rep?.rep?.name)}
				>
					Representative Information
				</SeeInfo>
			</ImgWrap>
			{isOpen === rep?.rep?.name && (
				<RepInfo
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
					<Party>
						<TitleSpan>Party</TitleSpan>
						<Span>{rep?.rep?.party_name}</Span>
					</Party>
					<Website
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9, color: "var(--color-red)" }}
					>
						<RepWebsite href={rep?.rep?.url} target="_blank">
							{rep?.rep?.last_name}'s Website
						</RepWebsite>
					</Website>
					<EmailBox
						whileHover={{ scale: 1.1 }}
						whileTap={{ scale: 0.9, color: "var(--color-red)" }}
					>
						<Email style={{ color: "var(--color-light-blue)" }} href={mailTo}>
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
					<Offices>
						{rep?.rep?.offices.map((office, index) => {
							const tel = "tel:" + office.tel;
							const address =
								"https://www.google.com/maps/search/?api=1&query=" +
								`${office.postal}`;
							return (
								<>
									<OfficeSpan>Office {index + 1}</OfficeSpan>
									<Office key={v4()}>
										<PhoneNumber href={tel} target="_blank">
											<FaPhoneSquareAlt
												style={{ color: "var(--color-green)" }}
											/>
											: {office.tel}
										</PhoneNumber>
										{office.postal && (
											<OfficeBox>
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
	/* box-shadow: -7px 11px 9px -7px #311e10; */
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
	border-top-left-radius: 4px;
	border-top-right-radius: 4px;
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
const RepWebsite = styled(motion.a)`
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
	margin-bottom: 5px;
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
`;
const Office = styled.div``;
