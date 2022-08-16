import React, { useContext } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { motion } from "framer-motion";
import { RepresentativesContext } from "./Context/RepresentativeContext";

const Header = () => {
	//import context
	const { userLocation } = useContext(RepresentativesContext);
	let nav = useNavigate();
	return (
		<Wrapper>
			<NavBar>
				{userLocation === null ? (
					<LogoDiv
						whileHover={{ opacity: 0.2, cursor: "pointer" }}
						whileTap={{ scale: 0.8 }}
						onClick={() => nav("/")}
					>
						<CompanyLogo>Opacity</CompanyLogo>
					</LogoDiv>
				) : (
					<LogoDiv
						whileHover={{ opacity: 0.2, cursor: "pointer" }}
						whileTap={{ scale: 0.8 }}
						onClick={() => nav("/homepage")}
					>
						<CompanyLogo>Opacity</CompanyLogo>
					</LogoDiv>
				)}
				<FindReps whileHover={{ opacity: 0.2 }} whileTap={{ scale: 0.8 }}>
					<StyledLink to="/">Find Your Representatives</StyledLink>
					<ImSearch
						style={{
							color: "var(--color-white)",
							marginLeft: "10px",
							marginRight: "10px",
						}}
					/>
				</FindReps>

				{/* <StyledLink to="/sign-up">Sign-up</StyledLink>
				<StyledLink to="log-in">Log-in</StyledLink>
				<StyledLink to="about">About</StyledLink> */}
			</NavBar>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	position: relative;
	padding-left: 30px;
	padding-right: 30px;
	/* padding-right: 20px; */
	padding-bottom: 15px;
	margin-bottom: 30px;
	background-color: var(--color-red);
	/* border: 3px solid var(--color-red); */
	min-height: 100px;
	width: clamp(50%, 75vw, 90%);
	border-bottom-left-radius: 20px;
	border-bottom-right-radius: 20px;
`;

const LogoDiv = styled(motion.div)``;
const CompanyLogo = styled.p`
	font-size: 44px;
	font-weight: bold;
	font-family: var(--font-heading);
	color: var(--color-white);
`;
const NavBar = styled.div`
	display: flex;
	@media (max-width: 768px) {
		flex-direction: column;
		padding-top: 20px;
		font-size: 14px;
	}
	justify-content: space-between;
	align-items: center;
	min-width: 100%;
`;
const FindReps = styled(motion.div)``;
const StyledLink = styled(Link)`
	color: var(--color-white);
	font-family: var(--font-heading);
`;

export default Header;
