// ExperienceDetails.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Gallery from './Gallery';
import LocationDuration from './LocationDuration';
import Overview from './Overview';
import Itinerary from './Itinerary';
import Highlights from './Highlights';
import Inclusions from './Inclusions';
import Variants from './Variants';
import CancellationPolicy from './CancellationPolicy';
import KnowBeforeYouGo from './KnowBeforeYouGo';
import FAQ from './FAQ';
import BoardingLocation from './BoardingLocation';
import SimilarExperiences from './SimilarExperiences';
import Booking from './Booking';
import Footer from '../Footer';

function ExperienceDetails({ experiences }) {
  const { experienceName } = useParams();
  const experience = experiences.find(exp => exp.name.toLowerCase().replace(/\s+/g, '-') === experienceName);

  if (!experience) {
    return <div className="text-center py-10">Experience not found</div>;
  }

  // Sample gallery images
  const sampleGallery = [
    "",
    "https://example.com/images/experience2.jpg",
    "https://example.com/images/experience3.jpg",
    "https://example.com/images/experience4.jpg",
    "https://example.com/images/experience5.jpg",
    "https://example.com/images/experience6.jpg",
  ];

  // Sample variants data
  const sampleVariants = [
    {
      name: "Standard Tour",
      description: "A comprehensive 3-hour tour of the main attractions.",
      price: 79.99,
      image: "https://example.com/images/standard-tour.jpg"
    },
    {
      name: "Premium Tour",
      description: "An extended 5-hour tour with VIP access and guide.",
      price: 129.99,
      image: "https://example.com/images/premium-tour.jpg"
    },
    {
      name: "Night Tour",
      description: "Experience the city lights on this 2-hour evening tour.",
      price: 89.99,
      image: "https://example.com/images/night-tour.jpg"
    }
  ];

  // Add the sample gallery and variants to the experience object
  const enrichedExperience = {
    ...experience,
    gallery: sampleGallery,
    variants: sampleVariants
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1 
          className="text-4xl font-bold mb-6 text-gray-800"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {enrichedExperience.name}
        </motion.h1>
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-2/3">
            <Gallery gallery={enrichedExperience.gallery} name={enrichedExperience.name} />
            <LocationDuration location={enrichedExperience.location} duration={enrichedExperience.duration} />
            <Overview overview={enrichedExperience.overview} />
            <Itinerary itinerary={enrichedExperience.itinerary} />
            <Highlights highlights={enrichedExperience.highlights} />
            <Inclusions inclusions={enrichedExperience.inclusions} />
            <Variants variants={enrichedExperience.variants} />
            <CancellationPolicy policy={enrichedExperience.cancellationPolicy} />
            <KnowBeforeYouGo items={enrichedExperience.knowBeforeYouGo} />
            <FAQ faq={enrichedExperience.faq} />
            <BoardingLocation location={enrichedExperience.boardingLocation} />
            <SimilarExperiences experiences={enrichedExperience.similarExperiences} />
          </div>
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <Booking 
              price={enrichedExperience.price || 0} 
              taxes={enrichedExperience.taxes || 0} 
              fees={enrichedExperience.fees || 0} 
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExperienceDetails;