import express from 'express';
import {
    createExperience,
    updateExperience,
} from '../controllers/experienceController/experienceController.js'; // Adjust the path as needed
import { acceptExperience,acceptUpdatedExperience } from '../controllers/admin/adminAcceptance/adminAcceptanceController.js'; // Adjust the path as needed
import { authenticate, isAdmin } from '../middlewares/authMiddlewares.js'; // Adjust the path as needed
import { getPendingExperiences } from '../controllers/admin/listForAcceptance/listOfItemsForAcceptanceController.js'; // Adjust the path as needed

const router = express.Router();


// Protected routes
router.post('/create-experience', authenticate, createExperience);
router.post('/update-experience/:id', authenticate, updateExperience);

// Admin routes
router.get('/pending-experiences', authenticate, isAdmin, getPendingExperiences);
router.post('/accept-experience/:id', authenticate, isAdmin, acceptExperience);
router.post('/accept-updated-experience/:id', authenticate, isAdmin, acceptUpdatedExperience);

export default router;
