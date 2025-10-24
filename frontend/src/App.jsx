import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home"; // ✅ import Home properly
import TrainingAndPlacements from "./pages/TrainingAndPlacement";
import Jobs from "./pages/Jobs";
import './global.css'
import Placements from "./pages/Placement";


import Services from "./components/Services";

import AboutUs from "./pages/AboutUs";
import ServicePage from "./pages/ServicePage";
import ContactPage from "./pages/ContactUs"
import CollegeGallery from "./pages/CollegeGallery";
import SocialPopup from "./components/SocialPopup";
function App() {
  const [showPopup, setShowPopup] = useState(true);
  return (
    <div className="app">
      <Navbar />
      <main className="content">
        {showPopup && (
        <SocialPopup
          
          onClose={() => setShowPopup(false)}
        />
      )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/training" element={<TrainingAndPlacements />} />
          <Route path="/serach-jobs" element={<Jobs/>} />
          <Route path="/placements" element={<Placements/>}/>
          <Route path="/gallary" element={<CollegeGallery/>} />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<ServicePage/>} />
          <Route path="/contact" element={<ContactPage/>} />
          <Route path="/*" element={"not found"} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
