import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
	return (
		<Wrapper>
			<CompanyLogo to="/">Opacity</CompanyLogo>
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
	background-color: var(--color-green);
	min-height: 100px;
	min-width: 60%;
	border-radius: 4px;
`;
const CompanyLogo = styled(Link)`
	font-size: 24px;
	font-weight: bold;
`;
const NavBar = styled.div``;
const StyledLink = styled(Link)`
	margin-left: 10px;
`;

export default Header;
