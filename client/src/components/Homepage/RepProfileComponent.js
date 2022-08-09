import React from "react";
import styled from "styled-components";
import {
	FaFacebook,
	FaTwitter,
	FaMailBulk,
	FaPhoneSquareAlt,
	FaMapMarkerAlt,
} from "react-icons/fa";

export const RepProfileComponent = (rep) => {
	console.log("rep", rep.rep);
	return (
		<Wrapper>
			<RepType>
				{rep.rep.elected_office}
				{rep.district_name}
			</RepType>
			<ImgWrap>
				<Img src={rep.rep.photo_url} alt={rep.rep.name} />
			</ImgWrap>
			<RepInfo>
				<Name>Name:{rep.rep.name}</Name>
				<ElectedBody>Elected to: {rep.rep.representative_set_name}</ElectedBody>
				<Party>Party Afilliation: {rep.rep.party_name}</Party>
				<Email>
					<FaMailBulk />: {rep.rep.email}
				</Email>
				{/* {rep.rep.extra.facebook && 
					<SocialMedia>
						<FaFacebook />: {rep.extra.facebook}
					</SocialMedia>
				}
				{rep.rep.extra.twitter && 
					<SocialMedia>
						<FaTwitter />: {rep.extra.twitter}
					</SocialMedia>
				} */}
				<Offices>
					{rep.rep.offices.map((office) => {
						return (
							<Office>
								<StyledP>
									<FaPhoneSquareAlt />: {office.tel}
								</StyledP>
								<StyledP>
									<FaMapMarkerAlt />: {office.postal}
								</StyledP>
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
	width: 100px;
	margin: 20px;
`;
const RepType = styled.p`
	padding: 10px;
`;
const ImgWrap = styled.div`
	width: 180px;
	height: 180px;
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 4px;
	background-color: white;
`;
const Img = styled.img`
	border-radius: 4px;
	height: auto;
	width: 120px;
`;
const RepInfo = styled.div``;
const Name = styled.p``;
const ElectedBody = styled.p``;
const Party = styled.p``;
const Email = styled.p``;
const SocialMedia = styled.p``;
const Offices = styled.div`
	display: flex;
	flex-direction: column;
`;
const StyledP = styled.p``;
const Office = styled.div``;
