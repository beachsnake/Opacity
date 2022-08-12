import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
// import { ImSearch } from "react-icons/im";


const Header = () => {
	let nav = useNavigate();
	return (
		<Wrapper>
			{/* <CompanyLogo to="/">Opacity</CompanyLogo> */}
			<LogoDiv onClick={() => nav("/")}>
				<CompanyLogo>Opacity</CompanyLogo>
			</LogoDiv>
			<NavBar>
				<StyledLink to="/sign-up">Sign-up</StyledLink>
				<StyledLink to="log-in">Log-in</StyledLink>
				<StyledLink to="about">About</StyledLink>
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
	background-color: var(--color-white);
	border: 3px solid var(--color-green);
	min-height: 100px;
	min-width: 73vw;
	border-radius: 8px;
`;

const LogoDiv = styled.div`
	&:hover {
		cursor: pointer;
	}

	/* @keyframes stripes {
	to {
	  background-size:100% 100%;
	}
	} */
`;
const CompanyLogo = styled.p`
	font-size: 24px;
	font-weight: bold;
	color: var(--color-black);
	opacity: 1;
	transition-duration: 1000ms;
	transition-property: opacity;

	&:hover {
		opacity: 0.2;
		cursor: pointer;
		/* transform: */
	}
`;
const NavBar = styled.div``;
const StyledLink = styled(Link)`
	margin-left: 10px;
	color: var(--color-black);
`;

export default Header;
