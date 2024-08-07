import express from 'express';
import { signUp, signIn, logOut, deleteAccount} from '../controllers/registration/vendorController.js'; // Adjust the path as needed
import { authenticate, isAdmin } from '../middlewares/authMiddlewares.js';
import { acceptVendor } from '../controllers/admin/adminAcceptance/adminAcceptanceController.js'; // Adjust the path as needed


const router = express.Router();

// Public routes
router.post('/signup', signUp);
router.post('/signin', signIn);

// Protected routes (You might need to add middleware for authentication)
router.post('/logout',authenticate, logOut);
router.delete('/delete',authenticate, deleteAccount);

// Admin routes (You might need to add middleware for admin authentication)
router.post('/accept-vendor',authenticate, isAdmin, acceptVendor);

export default router;
