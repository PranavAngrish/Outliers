import express from 'express';
import { addDemoExperiences } from '../controllers/seeds/seeds.js';


const router = express.Router();

// Route to add demo experiences
router.post('/add-demo-experiences', addDemoExperiences);

export default router;
