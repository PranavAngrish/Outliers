import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FirstPage from "./components/firstPage.jsx";
import Gallery from "./components/Gallery.jsx";
import Host from "./components/HostExperience.jsx";
import Footer from "./components/Footer.jsx";
import AuthForm from './components/AuthForm.jsx';
import Vendor from './components/vendorpanel/VendorPanel.jsx'
import Admin from './components/adminpanel/AdminPanel.jsx'
import ExperienceDetails from './components/EXPERIENCES/ExperienceDetails.jsx';
import udaipur from "/src/assets/outliers/udaipur.jpg";
import ExploreExperiences from "./components/ExploreExperiences.jsx";
import ExploreDestinations from './components/ExploreDestinations.jsx';
import EmailVerify from "./components/EmailVerify/index.jsx";
import AdminAuthForm from "./components/adminpanel/auth/AdminAuthForm.jsx";
import { useLocation } from 'react-router-dom';
import { useState } from "react";


import { useEffect } from "react";
import axios from "axios";
import VendorSignIn from "./components/vendorSignIn.jsx";

// Add this array of experiences
const experiences = [
  { 
    name: "Jaipur Bike Tour",
    gallery: [
      "/src/assets/outliers/jaipur1.jpg",
      "/src/assets/outliers/jaipur2.jpg",
      "/src/assets/outliers/jaipur3.jpg",
      "/src/assets/outliers/jaipur4.jpg",
      "/src/assets/outliers/jaipur5.jpg",
      "/src/assets/outliers/jaipur6.jpg"
    ],
    location: "Rajasthan, India",
    duration: "2 days",
    overview: "Explore the Pink City of India",
    itinerary: ["Visit Amber Fort", "Explore City Palace"],
    highlights: ["Rich cultural heritage", "Magnificent architecture"],
    inclusions: ["Hotel accommodation", "Local guide"],
    cancellationPolicy: "Free cancellation up to 24 hours before the start",
    knowBeforeYouGo: ["Wear comfortable shoes", "Bring sunscreen"],
    faq: [{ question: "Best time to visit?", answer: "October to March" }],
    boardingLocation: { lat: 26.9124, lng: 75.7873 },
    similarExperiences: [
      { 
        name: "Udaipur Lake Tour", 
        image: udaipur, 
        description: "Explore the City of Lakes" 
      }
    ],
    variants: [
      {
        name: "Standard Jaipur Tour",
        description: "A comprehensive 2-day tour of Jaipur's main attractions",
        price: 149.99,
        image: "/src/assets/outliers/jaipur_standard.jpg"
      },
      {
        name: "Premium Jaipur Experience",
        description: "An extended 3-day tour with luxury accommodations and exclusive access",
        price: 299.99,
        image: "/src/assets/outliers/jaipur_premium.jpg"
      },
      {
        name: "Jaipur Food and Culture Tour",
        description: "A 2-day tour focusing on Jaipur's culinary delights and cultural experiences",
        price: 179.99,
        image: "/src/assets/outliers/jaipur_food_culture.jpg"
      }
    ],
    price: 149.99,
    taxes: 15.00,
    fees: 10.00
  },
  // Add more experiences here...
];

function App() {
  useEffect(()=>{
    console.log("App component mounted");
  })

  console.log("We are here")

  return (

    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/adminauth" element={<AdminAuthForm />} />
        <Route path="/vendor" element={<Vendor />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/host" element={<Host />} />
        <Route path='/vendor-signin' element={<VendorSignIn/>}></Route>
        <Route path="/user/:id/verify/:token" element={<EmailVerify/>}></Route>
        <Route 
          path="/experience/:experienceId" 
          element={<ExperienceDetails experiences={experiences} />} 
        />
      </Routes>
    </Router>
  );
}

function Home() {
  const navItems = ["Experiences", "Destinations", "Gallery", "Contact Us"];
  
  
  console.log("Home component mounted");
  
//   useEffect(()=>{
//     const seedData = async () => {
//     try{
//       console.log("Seeding data...");
//       const demoData = await axios.put('/api/seed/add-demo-experiences');
//       console.log(demoData);
//     }
//     catch(error){
//       console.error('Error adding demo experiences:', error.response?.data || error.message);

//     }

//   }
//   seedData();
// } 
//   ,[]);
  // useEffect(()=>{
  //   const vendorData = async () => {
  //     try{
  //       console.log("Adding vendor data...");
  //       const demoData = await axios.post('/api/seed/add-demo-vendors');
  //       console.log(demoData);
  //     }
  //     catch(error){
  //       console.error('Error adding demo vendors:', error.response?.data || error.message);
  //     }
  //   }
  //   vendorData();
  // })
  return (
    <div className="min-h-screen w-full">
      <FirstPage navItems={navItems}/>
      <ExploreExperiences experiences={experiences} />
      <ExploreDestinations />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;