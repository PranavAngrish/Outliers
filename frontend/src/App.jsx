import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FirstPage from "./components/firstPage.jsx";
import ExploreDestinations from "./components/ExploreDestinations.jsx";
import Gallery from "./components/Gallery.jsx";
import Footer from "./components/Footer.jsx";
import AuthForm from './components/AuthForm.jsx';
import ExperienceDetails from './components/EXPERIENCES/ExperienceDetails.jsx';
// Add this array of experiences
const experiences = [
  { 
    name: "Jaipur",
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
        image: "/src/assets/outliers/udaipur.jpg", 
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
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthForm />} />
        <Route 
          path="/experience/:experienceName" 
          element={<ExperienceDetails experiences={experiences} />} 
        />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div className="min-h-screen w-full">
      <FirstPage />
      <ExploreDestinations experiences={experiences} />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;