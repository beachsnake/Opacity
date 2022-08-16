import React from "react";
import styled from "styled-components";

const Footer = () => {
	return <Wrapper></Wrapper>;
};
const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: flex-end;
	padding-left: 20px;
	padding-right: 20px;
	padding-bottom: 15px;
	margin-top: 30px;
	background-color: var(--color-red);
	/* border: 3px solid var(--color-red); */
	min-height: 100px;
	width: clamp(50%, 75vw, 90%);
	/* min-width: 73vw; */
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
`;
export default Footer;
