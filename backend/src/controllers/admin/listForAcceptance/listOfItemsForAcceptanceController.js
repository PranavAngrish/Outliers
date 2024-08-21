import { PendingExperience } from '../../../models/pendingExperience.model.js';
import { AcceptedExperience } from '../../../models/acceptedExperience.model.js';
import { UpdatedExperience } from '../../../models/updatedExperience.model.js';
import { Vendor } from '../../../models/vendor.model.js';

// Get Pending Experiences for Admin
export const getPendingExperiences = async (req, res) => {
    try {
        const pendingExperiences = await PendingExperience.find().populate('vendor');
        res.status(200).json(pendingExperiences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get Updated Experiences for Admin
export const getUpdatedExperiences = async (req, res) => {
    try {
        const updatedExperiences = await UpdatedExperience.find().populate('vendor');
        res.status(200).json(updatedExperiences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};





// Function to get all pending vendors
export const getPendingVendors = async (req, res) => {
    try {
        const pendingVendors = await Vendor.find({ status: 'pending' }); // Assuming 'status' is a field in your Vendor model
        if (!pendingVendors.length) {
            return res.status(404).json({ message: 'No pending vendors found' });
        }
        res.status(200).json(pendingVendors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
