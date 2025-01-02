

import express from 'express';
import { getPendingVendors } from '../controllers/admin/listForAcceptance/listOfItemsForAcceptanceController.js';
import { acceptVendor } from '../controllers/admin/adminAcceptance/adminAcceptanceController.js';
import { getAcceptedVendors } from '../controllers/listOfViews/acceptedVendorsController.js';
import { getVendorDetails } from '../controllers/admin/details/detailedInfoController.js';
import { authenticateAndAuthorizeAdmin } from '../middlewares/authMiddlewares.js';
import { adminGoogleAuth, adminSignIn ,adminSignUpUsingEmail, verifyEmail } from '../controllers/registration/adminController.js';

const router = express.Router();


router.get("/admingoogle", adminGoogleAuth );
router.post("/signup", adminSignUpUsingEmail);
router.post("/login", adminSignIn);
router.get('/user/:id/verify/:token',verifyEmail);
// Get all pending vendors

router.get('/pending',authenticateAndAuthorizeAdmin, getPendingVendors);

// Get all accepted vendors
router.get('/accepted',authenticateAndAuthorizeAdmin, getAcceptedVendors);

// Accept a pending vendor
router.put('/accept/:vendorId',authenticateAndAuthorizeAdmin, acceptVendor);

// Get details of a specific vendor
router.get('/:vendorId',authenticateAndAuthorizeAdmin, getVendorDetails);


export default router;
