import './App.css';
import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login.jsx";
import SignUp from './pages/Signup.jsx';
import HotelsPage from './pages/HotelsPage.jsx';
import HotelListing from './pages/HotelListing.jsx';
import FlightsListing from './pages/FlightsListing.jsx';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/stays" element={<HotelsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/hotels" element={<HotelListing />} />
        <Route path="/flights" element={<FlightsListing />} />
      </Routes>
    </Router>
  );
}


export default App;
