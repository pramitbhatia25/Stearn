import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./app.css";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/dashboard/*" element={<Dashboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
