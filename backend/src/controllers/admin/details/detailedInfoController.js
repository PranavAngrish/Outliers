import { Vendor } from "../../../models/vendor.model.js";


// Admin: Get Vendor Details
export const getVendorDetails = async (req, res) => {
    try {
        const { vendorId } = req.params; // Get vendorId from route parameters

        // Find the vendor by ID
        const vendor = await Vendor.findById(vendorId)
            .populate('experiences') // Populate related experiences if needed
            .select('-password'); // Exclude sensitive fields like password

        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        res.status(200).json(vendor);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Get Experience Details
export const getExperienceDetails = async (req, res) => {
    try {
        const { experienceId } = req.params; // Get experienceId from route parameters

        // Find the experience by ID
        const experience = await AcceptedExperience.findById(experienceId)
            .populate('vendor', 'username email') // Populate vendor details, showing only username and email
            

        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        res.status(200).json(experience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
