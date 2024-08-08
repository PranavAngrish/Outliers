import { AcceptedExperience } from '../models/acceptedExperience.model.js';
import { PendingExperience } from '../models/pendingExperience.model.js';


// Get Admin Accepted Experiences of the vendor
export const getVendorAcceptedExperiences = async (req, res) => {
    try {
        const { vendorId } = req.params;
        const acceptedExperiences = await AcceptedExperience.find({ vendor: vendorId });
        res.status(200).json(acceptedExperiences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// Get pending Experiences of the vendor
export const getVendorPendingExperiences = async (req, res) => {
    try {
        const { vendorId } = req.params;
        const pendingExperiences = await PendingExperience.find({ vendor: vendorId });
        res.status(200).json(pendingExperiences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
