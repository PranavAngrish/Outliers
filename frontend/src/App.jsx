import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FirstPage from "./components/firstPage.jsx";
import ExploreDestinations from "./components/ExploreDestinations.jsx";
import Gallery from "./components/Gallery.jsx";
import Footer from "./components/Footer.jsx";
import AuthForm from './components/AuthForm.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return (
    <div className="min-h-screen w-full">
      <FirstPage />
      <ExploreDestinations />
      <Gallery />
      <Footer />
    </div>
  );
}

export default App;