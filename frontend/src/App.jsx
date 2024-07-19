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
    gallery: ["/src/assets/outliers/jaipur.jpg"],
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
    similarExperiences: [{ name: "Udaipur Lake Tour", image: "/src/assets/outliers/udaipur.jpg", description: "loremipsum" },]
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