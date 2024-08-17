import { Vendor } from '../../models/vendor.model.js';

// Function to get all accepted vendors
export const getAcceptedVendors = async (req, res) => {
    try {
        const acceptedVendors = await Vendor.find({ verificationStatus: 'approved' });
        if (!acceptedVendors.length) {
            return res.status(404).json({ message: 'No accepted vendors found' });
        }
        res.status(200).json(acceptedVendors);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
