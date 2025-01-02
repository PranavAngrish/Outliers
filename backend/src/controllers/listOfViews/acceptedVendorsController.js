import { Vendor } from '../../models/vendor.model.js';

// Function to get all accepted vendors
export const getAcceptedVendors = async (req, res) => {
    try {

        console.log("In accepted func")
        const acceptedVendors = await Vendor.find({ verificationStatus: 'accepted' });
        console.log('Vendors?:', acceptedVendors)
        if (!acceptedVendors.length) {
            console.log("Not case")
            return res.status(404).json({ message: 'No accepted vendors found' });
        }
        console.log("Sending case");
        res.status(200).json({ body: acceptedVendors});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
