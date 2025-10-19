import './App.css';
import Home from "./pages/Home.jsx"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import FlightSearch from "./pages/FlightSearch.jsx"

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="flights" element={<FlightSearch />} />
      </Routes>
    </Router>
  );
}


export default App;
