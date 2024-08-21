

import express from 'express';
import { getPendingVendors } from '../controllers/admin/listForAcceptance/listOfItemsForAcceptanceController.js';
import { acceptVendor } from '../controllers/admin/adminAcceptance/adminAcceptanceController.js';
import { getAcceptedVendors } from '../controllers/listOfViews/acceptedVendorsController.js';
import { getVendorDetails } from '../controllers/admin/details/detailedInfoController.js';
import { authenticateAndAuthorizeAdmin } from '../middlewares/authMiddlewares.js';
const router = express.Router();

// Get all pending vendors

router.get('/pending',authenticateAndAuthorizeAdmin, getPendingVendors);

// Get all accepted vendors
router.get('/accepted',authenticateAndAuthorizeAdmin, getAcceptedVendors);

// Accept a pending vendor
router.put('/accept/:vendorId',authenticateAndAuthorizeAdmin, acceptVendor);

// Get details of a specific vendor
router.get('/:vendorId',authenticateAndAuthorizeAdmin, getVendorDetails);

export default router;
