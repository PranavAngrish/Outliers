import { Vendor } from '../../../models/vendor.model.js';
import { PendingExperience } from '../../../models/pendingExperience.model.js';
import { AcceptedExperience } from '../../../models/acceptedExperience.model.js';
import { UpdatedExperience } from '../../../models/updatedExperience.model.js';
import { uploadToCloudinary, blobToFile } from '../../../cloudinary/cloudinary.js';


import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
const jwtExpiry = '1h';

const upload = multer({ dest: 'uploads/' })


// Create Experience
// export const createExperience = async (req, res) => {
//     try {
//         const { name, description, images, location, startDate, endDate, timeSlots, maxOccupancyPerSlot, duration, overview, itinerary, highlights, inclusions, cancellationPolicy, knowBeforeYouGo, faq, boardingLocationLink, basePrice, taxes, fees, variants, vendor } = req.body;

//         const newExperience = new PendingExperience({
//             title: name,
//             vendor,
//             images,
//             description,
//             variants,
//             timeSlots,
//             MaximumCapacity: maxOccupancyPerSlot,
//             cancellationPeriod,
//             state: location.state,
//             city: location.city,
//             category,
//             startDate,
//             endDate,
//             duration,
//             overview,
//             itinerary, 
//             highlights, 
//             inclusions, 
//             cancellationPolicy, 
//             knowBeforeYouGo, 
//             faq, 
//             boardingLocationLink, 
//             basePrice, 
//             taxes, 
//             fees

//         });

//         await newExperience.save();
//         res.status(201).json({ message: 'Experience created and pending for approval' });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };



export const createExperience = async (req, res) => {
    try {
        console.log("Are we even in this function yet");
      const { 
        name, description, images, location, startDate, endDate, timeSlots, maxOccupancyPerSlot,
        duration, overview, itinerary, highlights, inclusions, cancellationPolicy, knowBeforeYouGo,
        faq, boardingLocationLink, basePrice, taxes, fees, variants, vendor, cancellationPeriod, category
      } = req.body;
  
      // Check if the vendor exists
      const vendorExists = await Vendor.findById(vendor);
      if (!vendorExists) {
        return res.status(404).json({ message: 'Vendor not found' });
      }

      // Upload images to Cloudinary and store the URLs
    //   console.log("The images are as follows",images);
    // console.log("The images are as follows",images);
    // console.log("We are going to uploadImages");

    // const uploadedImages = await Promise.all(images.map(async (image) => {
    //     const file = await blobToFile(image);
    //     console.log("The file is as follows",file);
    //     const result = await uploadToCloudinary(file);
    //     console.log("The result is as follows",result);
    //     return {
    //       url: result.secure_url,
    //       publicId: result.public_id
    //     };
    //   }));


   

    //   console.log("The uploaded images are as follows",uploadedImages);
    console.log("Befpore 1")


      // Create a new pending experience
      const pendingExperience = new PendingExperience({
        title:name, description, 
        //images: uploadedImages, 
        state: location.state, city: location.city ,
        startDate, endDate, timeSlots, MaximumCapacity: maxOccupancyPerSlot, duration, overview, itinerary,
        highlights, inclusions, cancellationPolicy, knowBeforeYouGo, faq,
        boardingLocationLink, basePrice, taxes, fees, vendor: vendorExists._id,
        cancellationPeriod, category
      });
      console.log("Before 2")
  
      // Save the pending experience
      await pendingExperience.save();
      console.log("Before 3")
  
      // Create new accepted experiences (variants)
      const createdVariants = [];
      for (const variant of variants) {
        
        // const uploadedVariantImages = await Promise.all(variant.images.map(async (image) => await uploadToCloudinary(image)));

        const variantExperience = new PendingExperience({
          ...variant,
          vendor: vendorExists._id,
        //   images: uploadedVariantImages,
        });
        await variantExperience.save();
        createdVariants.push(variantExperience._id);
      }
  
      // Update the pending experience with the created variants
      pendingExperience.variants = createdVariants;
      await pendingExperience.save();
  
      res.status(201).json(pendingExperience);
    } catch (error) {
      console.error('Error creating experience:', error);
      res.status(500).json({ message: 'Error creating experience' });
    }
  };





// Update Experience
export const updateExperience = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, images, description, termsAndConditions, price, variants, addOns, timeSlots, MaximumCapacity, cancellationPeriod, state, city, category } = req.body;

        const experience = await AcceptedExperience.findById(id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        const updatedExperience = new UpdatedExperience({
            title,
            vendor: experience.vendor,
            images,
            description,
            termsAndConditions,
            price,
            variants,
            addOns,
            timeSlots,
            MaximumCapacity,
            cancellationPeriod,
            state,
            city,
            category
        });

        await updatedExperience.save();
        await AcceptedExperience.findByIdAndDelete(id);

        res.status(200).json({ message: 'Experience updated and pending for approval' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

