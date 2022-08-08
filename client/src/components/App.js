import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import './App.css';

function App() {
  return (
<>
<Router>
  <Header />
  <Routes>
    <Route exact path="/" element={<Homepage />} />
  </Routes>
</Router>
</>
  );
}

export default App;
