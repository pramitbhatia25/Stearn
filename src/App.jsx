import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./app.css";
import Login from "./pages/Login";
import Trade from "./pages/Trade";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/trade" element={<Trade />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
