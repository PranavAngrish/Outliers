import { PendingBooking } from '../../../models/pendingBooking.model.js'; // Adjust the path as needed

// Function to get all pending bookings for a specific vendor
export const getPendingBookingsByVendor = async (req, res) => {
    try {
        const { vendorId } = req.params;

        // Find all pending bookings associated with the specified vendor
        const pendingBookings = await PendingBooking.find({ vendor: vendorId }).populate('user', 'username email');

        if (!pendingBookings.length) {
            return res.status(404).json({ message: 'No pending bookings found for this vendor' });
        }

        res.status(200).json(pendingBookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
