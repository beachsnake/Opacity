import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { ImSearch } from "react-icons/im";
import { motion } from "framer-motion";

const Header = () => {
	let nav = useNavigate();
	return (
		<Wrapper>
			{/* <CompanyLogo to="/">Opacity</CompanyLogo> */}
			<LogoDiv
				whileHover={{ scale: 1.1, opacity: 0.2, cursor: "pointer" }}
				whileTap={{ scale: 0.8 }}
				onClick={() => nav("/homepage")}
			>
				<CompanyLogo>Opacity</CompanyLogo>
			</LogoDiv>
			<NavBar
				whileHover={{ scale: 1.1, opacity: 0.2 }}
				whileTap={{ scale: 0.8 }}
			>
				<StyledLink to="/">Find Your Representatives</StyledLink>
				<ImSearch
					style={{
						color: "var(--color-white)",
						marginLeft: "10px",
						marginRight: "10px",
					}}
				/>
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
	align-items: center;
	padding-left: 20px;
	padding-right: 20px;
	margin-bottom: 30px;
	background-color: var(--color-yellow);
	/* border: 3px solid var(--color-red); */
	min-height: 100px;
	min-width: 73vw;
	border-radius: 8px;
`;

const LogoDiv = styled(motion.div)``;
const CompanyLogo = styled.p`
	font-size: 24px;
	font-weight: bold;
	font-family: "Bungee", cursive;
	color: var(--color-white);
	opacity: 1;
	transition-duration: 1000ms;
	transition-property: opacity;

	/* &:hover {
		opacity: 0.2;
		cursor: pointer;
		/* transform: */
	} */
`;
const NavBar = styled(motion.div)`
	display: flex;
	align-items: center;
`;
const StyledLink = styled(Link)`
	/* margin-right: 10px; */
	color: var(--color-white);
	font-family: "Bungee", cursive;
`;

export default Header;
