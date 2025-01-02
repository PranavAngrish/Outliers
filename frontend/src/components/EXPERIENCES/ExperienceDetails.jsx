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
import { useEffect,useState } from 'react';
import axios from 'axios';

function ExperienceDetails({ experiences }) {
  const { experienceId } = useParams();
  const [experienceDetails, setExperienceDetails] = useState(null);
  useEffect(()=>{
    const getDetails = async () => {
      try{
        const experience = await axios.get(`/api/experiences/experiences/${experienceId}`);
        console.log(experience);
        setExperienceDetails(experience.data);

      }
      catch(error){
        console.error('Error getting experience details:', error.response?.data || error.message)
        }
    }

    getDetails();

  },[])

  
  if (!experienceDetails) {
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
          {experienceDetails.name}
        </motion.h1>
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-2/3">
            <Gallery gallery={experienceDetails?.images} name={experienceDetails?.title} />
            <LocationDuration state={experienceDetails.state} city={experienceDetails.city} duration={experienceDetails?.duration||0} />
            <Overview overview={experienceDetails?.description} />
            <Itinerary itinerary={experienceDetails?.itinerary||null} />
            <Highlights highlights={experienceDetails?.highlights||null} />
            <Inclusions inclusions={experienceDetails?.addOns} />
            <Variants variants={experienceDetails?.variants||null} />
            <CancellationPolicy policy={experienceDetails?.cancellationPolicy} />
            <KnowBeforeYouGo items={experienceDetails?.knowBeforeYouGo || null} />
            <FAQ faq={experienceDetails?.faq || null} />
            <BoardingLocation location={experienceDetails?.boardingLocation || null} />
            <SimilarExperiences experiences={experienceDetails?.similarExperiences || null} />
          </div>
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <Booking 
              price={experienceDetails.price || 0} 
              taxes={experienceDetails.taxes || 0} 
              fees={experienceDetails.fees || 0} 
              timeSlots={experienceDetails.timeSlots || null}
              experienceId={experienceDetails._id}
              vendorId={experienceDetails.vendor}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ExperienceDetails;