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

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.h1 
          className="text-4xl font-bold mb-6 text-gray-800"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {experience.name}
        </motion.h1>
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-2/3">
            <Gallery gallery={experience.gallery} name={experience.name} />
            <LocationDuration location={experience.location} duration={experience.duration} />
            <Overview overview={experience.overview} />
            <Itinerary itinerary={experience.itinerary} />
            <Highlights highlights={experience.highlights} />
            <Inclusions inclusions={experience.inclusions} />
            <Variants variants={experience.variants} />
            <CancellationPolicy policy={experience.cancellationPolicy} />
            <KnowBeforeYouGo items={experience.knowBeforeYouGo} />
            <FAQ faq={experience.faq} />
            <BoardingLocation location={experience.boardingLocation} />
            <SimilarExperiences experiences={experience.similarExperiences} />
          </div>
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <Booking 
              price={experience.price || 0} 
              taxes={experience.taxes || 0} 
              fees={experience.fees || 0} 
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExperienceDetails;