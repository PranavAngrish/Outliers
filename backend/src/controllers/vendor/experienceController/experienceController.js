import { Vendor } from '../../../models/vendor.model.js';
import { PendingExperience } from '../../../models/pendingExperience.model.js';
import { AcceptedExperience } from '../../../models/acceptedExperience.model.js';
import { UpdatedExperience } from '../../../models/updatedExperience.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || 'your_jwt_secret';
const jwtExpiry = '1h';


// Create Experience
export const createExperience = async (req, res) => {
    try {
        const { title, images, description, termsAndConditions, price, variants, addOns, timeSlots, MaximumCapacity, cancellationPeriod, state, city, category } = req.body;
        const vendor = req.vendor._id;

        const newExperience = new PendingExperience({
            title,
            vendor,
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

        await newExperience.save();
        res.status(201).json({ message: 'Experience created and pending for approval' });
    } catch (error) {
        res.status(500).json({ error: error.message });
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

