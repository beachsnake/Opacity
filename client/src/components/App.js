import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import GlobalStyles from "./GlobalStyles";
// import './App.css';
import Header from "./Header";
import Homepage from "./Homepage/Homepage";
import LandingPage from "./LandingPage/LandingPage";

function App() {
  return (
<>
<Router>
  <Header />
  <Routes>
    <Route exact path ="/" element={<LandingPage />} />
    <Route exact path="/homepage" element={<Homepage />} />
  </Routes>
</Router>
</>
  );
}

export default App;
