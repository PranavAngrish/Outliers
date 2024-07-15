import React from "react";
import FirstPage from "./components/firstPage.jsx";
import ExploreDestinations from "./components/ExploreDestinations.jsx";
import Gallery from "./components/Gallery.jsx";
import Footer from "./components/Footer.jsx";

function App() {
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