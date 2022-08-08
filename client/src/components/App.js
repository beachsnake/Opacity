import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";
import Header from "./Header";
import Homepage from "./Homepage/Homepage";
import LandingPage from "./LandingPage/LandingPage";
import SignUpPage from "./SignUpPage/SignUpPage";
import { LogInPage } from "./LogInPage/LogInPage";
import AboutPage from "./AboutPage/AboutPage";

function App() {
	return (
		<>
			<Router>
				<GlobalStyles />
				<Wrapper>
					<Header />
					<Routes>
						<Route exact path="/" element={<LandingPage />} />
						<Route exact path="/homepage" element={<Homepage />} />
            <Route exact path="/sign-up" element={<SignUpPage />} />
            <Route exact path="/log-in" element={<LogInPage />} />
            <Route exact path="/about" element={<AboutPage />} />
					</Routes>
				</Wrapper>
			</Router>
		</>
	);
}

const Wrapper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
background-color: var(--color-white);
`;

export default App;
