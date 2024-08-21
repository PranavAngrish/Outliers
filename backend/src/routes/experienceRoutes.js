import express from 'express';
import {
    createExperience,
    updateExperience,
} from '../controllers/vendor/experienceController/experienceController.js'; // Adjust the path as needed
import { acceptExperience,acceptUpdatedExperience } from '../controllers/admin/adminAcceptance/adminAcceptanceController.js'; // Adjust the path as needed
import { authenticateAndAuthorizeAdminOrVendor, authenticateAndAuthorizeAdmin, checkUserSignedIn } from '../middlewares/authMiddlewares.js';
import { getPendingExperiences } from '../controllers/admin/listForAcceptance/listOfItemsForAcceptanceController.js'; // Adjust the path as needed
import { createTrip } from '../controllers/vendor/trip/tripController.js';
import { getExperiencesByCategory, getExperiencesByState, getRandomExperiences } from '../controllers/listOfViews/viewExperiences.js';
import { getExperienceDetails } from '../controllers/user/bookingController.js';
import { createPendingBooking } from '../controllers/user/bookingController.js';
const router = express.Router();

// Route to get experiences by category
router.get('/experiences/category', getExperiencesByCategory);
// Route to get experiences by state
router.get('/experiences/state', getExperiencesByState);
// Route to get random experiences
router.get('/experiences/random', getRandomExperiences);

// Route to get experience details by ID
router.get('/experiences/:experienceId', getExperienceDetails);



//Route to create a pending booking
router.post('/create-booking',checkUserSignedIn, createPendingBooking);


// Protected routes
router.post('/create-experience', authenticateAndAuthorizeAdminOrVendor, createExperience);
router.post('/update-experience/:id', authenticateAndAuthorizeAdminOrVendor, updateExperience);

// Admin routes
router.get('/pending-experiences', authenticateAndAuthorizeAdminOrVendor, getPendingExperiences);
router.post('/accept-experience/:id',authenticateAndAuthorizeAdmin , acceptExperience);
router.post('/accept-updated-experience/:id', authenticateAndAuthorizeAdmin, acceptUpdatedExperience);



export default router;
