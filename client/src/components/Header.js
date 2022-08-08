import React from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
	return (
		<Wrapper>
			<CompanyLogo to="/"></CompanyLogo>
			<NavBar>
				<SignUp to="/sign-up"></SignUp>
				<LogIn to="log-in"></LogIn>
				<About to="about"></About>
			</NavBar>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	background-color: var(--color-green);
	height: 100px;
	width: 60%;
`;
const CompanyLogo = styled(Link)``;
const NavBar = styled.div``;
const SignUp = styled(Link)``;
const LogIn = styled(Link)``;
const About = styled(Link)``;

export default Header;
