import express from 'express';
import {
    createExperience,
    updateExperience,
} from '../controllers/experienceController/experienceController.js'; // Adjust the path as needed
import { acceptExperience,acceptUpdatedExperience } from '../controllers/admin/adminAcceptance/adminAcceptanceController.js'; // Adjust the path as needed
import { authenticate, isAdmin } from '../middlewares/authMiddlewares.js'; // Adjust the path as needed
import { getPendingExperiences } from '../controllers/admin/listForAcceptance/listOfItemsForAcceptanceController.js'; // Adjust the path as needed
import { createTrip } from '../controllers/vendor/trip/tripController.js';
import { getExperiencesByCategory, getExperiencesByState, getRandomExperiences } from '../controllers/experienceController/experienceController.js';
import { getExperienceDetails } from '../controllers/experienceController/experienceController.js';


const router = express.Router();

// Route to get experiences by category
router.get('/experiences/category', getExperiencesByCategory);
// Route to get experiences by state
router.get('/experiences/state', getExperiencesByState);
// Route to get random experiences
router.get('/experiences/random', getRandomExperiences);

// Route to get experience details by ID
router.get('/experiences/:experienceId', getExperienceDetails);



// Protected routes
router.post('/create-experience', authenticate, createExperience);
router.post('/update-experience/:id', authenticate, updateExperience);

// Admin routes
router.get('/pending-experiences', authenticate, isAdmin, getPendingExperiences);
router.post('/accept-experience/:id', authenticate, isAdmin, acceptExperience);
router.post('/accept-updated-experience/:id', authenticate, isAdmin, acceptUpdatedExperience);
router.post('/create-trip', authenticate, createTrip);



export default router;
