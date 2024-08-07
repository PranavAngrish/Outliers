
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Vendor } from '../../../models/vendor.model.js'// Adjust the path as needed
import { PendingExperience } from '../../../models/pendingExperience.model.js';
import { AcceptedExperience } from '../../../models/acceptedExperience.model.js';
import { UpdatedExperience } from '../../../models/updatedExperience.model.js';


// Admin: Accept Vendor
export const acceptVendor = async (req, res) => {
    try {
        const { vendorId } = req.body;

        // Find the vendor by ID and update the verification status to 'accepted'
        const vendor = await Vendor.findByIdAndUpdate(vendorId, { verificationStatus: 'accepted' }, { new: true });

        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        res.status(200).json({ message: 'Vendor accepted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Accept Experience by Admin
export const acceptExperience = async (req, res) => {
    try {
        const { id } = req.params;

        const experience = await PendingExperience.findById(id);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        const acceptedExperience = new AcceptedExperience(experience.toObject());
        await acceptedExperience.save();
        await PendingExperience.findByIdAndDelete(id);

        res.status(200).json({ message: 'Experience accepted and moved to accepted experiences' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Accept Updated Experience by Admin
export const acceptUpdatedExperience = async (req, res) => {
    try {
        const { id } = req.params;

        const experience = await UpdatedExperience.findById(id);
        if (!experience) {
            return res.status(404).json({ message: 'Updated experience not found' });
        }

        const acceptedExperience = new AcceptedExperience(experience.toObject());
        await acceptedExperience.save();
        await UpdatedExperience.findByIdAndDelete(id);

        res.status(200).json({ message: 'Updated experience accepted and moved to accepted experiences' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
