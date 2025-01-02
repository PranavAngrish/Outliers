import express from 'express';
import { addDemoExperiences } from '../controllers/seeds/seeds.js';
import { seedVendors } from '../controllers/seeds/vendorSeeds.js';


const router = express.Router();

// Route to add demo experiences
router.put('/add-demo-experiences', addDemoExperiences);
router.post('/add-demo-vendors', seedVendors);

export default router;
