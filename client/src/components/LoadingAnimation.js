import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const LoadingAnimation = () => {
	return (
		<Wrapper>
			<motion.div
				animate={{
					rotate: 360,
					borderRadius: "50%",
					x: 500,
				}}
				initial={{
					x: 0,
				}}
				transition={{
					flip: Infinity,
					duration: 2,
					ease: "easeInOut",
				}}
				style={{
					height: "50px",
					background: "#E85F5C",
					width: "50px",
					borderRadius: "0% 50%",
				}}
			></motion.div>
			<motion.div
				animate={{
					rotate: 360,
					borderRadius: "50%",
					x: -500,
				}}
				initial={{
					x: 0,
				}}
				transition={{
					flip: Infinity,
					duration: 2,
					ease: "easeInOut",
				}}
				style={{
					height: "50px",
					background: "#3c91e6",
					width: "50px",
					borderRadius: "0% 50%",
				}}
			></motion.div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	justify-content: center;
	position: relative;
	margin-top: 35vh;
`;
export default LoadingAnimation;
