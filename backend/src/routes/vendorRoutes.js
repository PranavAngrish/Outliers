import express from 'express';
import { signUp, signIn, logOut, deleteAccount} from '../controllers/registration/vendorController.js'; // Adjust the path as needed
import {authenticateAndAuthorizeVendor } from '../middlewares/authMiddlewares.js';
import { getVendorAcceptedExperiences, getVendorPendingExperiences} from '../controllers/vendor/listView/listView.js'; // Adjust the path as needed
import { getPendingBookingsByVendor } from '../controllers/vendor/bookings/pendingController.js'; // Adjust the path as needed
const router = express.Router();

// Public routes
router.post('/signup', signUp);
router.post('/signin', signIn);

// Protected routes (You might need to add middleware for authentication)
router.post('/logout',authenticateAndAuthorizeVendor, logOut);
router.delete('/delete',authenticateAndAuthorizeVendor, deleteAccount);


// Routes for getting accepted experiences and pending experiences of a vendor
router.get('/:vendorId/accepted-experiences',authenticateAndAuthorizeVendor, getVendorAcceptedExperiences);
router.get('/:vendorId/pending-experiences', authenticateAndAuthorizeVendor, getVendorPendingExperiences);

//Routes for bookings
router.get('/:vendorId/pending-bookings', getPendingBookingsByVendor);

export default router;
