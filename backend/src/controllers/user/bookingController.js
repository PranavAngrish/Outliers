import { PendingBooking } from '../../models/pendingBooking.model.js';
import { AcceptedBooking } from '../../models/acceptedBooking.model.js';
import { AcceptedExperience } from '../../models/acceptedExperience.model.js';
import { Trip } from '../../models/trip.model.js';
import { createTrip } from '../vendor/trip/tripController.js';




// Function to get details of a specific experience
export const getExperienceDetails = async (req, res) => {
    try {
        const { experienceId } = req.params; // Get the experience ID from request parameters

        // Find the experience by ID and populate the vendor details
        const experience = await AcceptedExperience.findById(experienceId).populate('vendor', 'username email');

        // Check if the experience exists
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        // Return the experience details
        res.status(200).json(experience);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// Create a pending booking
export const createPendingBooking = async (req, res) => {
    const { userId, experienceId, numberOfPeople, remarks, ageOfPeople, addOns, dateTime } = req.body;

    try {
        const experience = await AcceptedExperience.findById(experienceId);
        if (!experience) {
            return res.status(404).json({ message: 'Experience not found' });
        }

        // Find an existing trip with the same experience and dateTime
        const trip = await Trip.findOne({
            experience: experienceId,
            dateTime: new Date(dateTime)
        });

        const pendingBooking = new PendingBooking({
            user: userId,
            numberOfPeople,
            remarks,
            ageOfPeople,
            addOns,
            vendor: experience.vendor,
            dateTime,
            trip: trip ? trip._id : null, // If trip exists, use its ID, otherwise set to null
            experience: experienceId
        });

        await pendingBooking.save();
        res.status(201).json({ message: 'Booking request submitted successfully', pendingBooking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all pending bookings for a vendor
export const getPendingBookings = async (req, res) => {
    try {
        const vendorId = req.vendor._id; // Assuming req.vendor contains the authenticated vendor's info
        const pendingBookings = await PendingBooking.find({ vendor: vendorId }).populate('user', 'name email');

        res.status(200).json(pendingBookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




// Function to accept a pending booking
export const acceptPendingBooking = async (req, res) => {
    try {
        const { bookingId } = req.params;

        // Find the pending booking by ID
        const pendingBooking = await PendingBooking.findById(bookingId);
        if (!pendingBooking) {
            return res.status(404).json({ message: 'Pending booking not found' });
        }

        const { user, numberOfPeople, remarks, ageOfPeople, addOns, vendor, dateTime, trip, experience } = pendingBooking;

        // Create or update the trip
        const { tripInfo, booking } = await createTrip(
            experience,
            dateTime,
            numberOfPeople,
            user,
            remarks,
            ageOfPeople,
            addOns
        );

        
        //trip is being saved in database in createTrip function

        // Remove the pending booking
        await PendingBooking.findByIdAndDelete(bookingId);

        res.status(200).json({ message: 'Booking accepted successfully', tripInfo, acceptedBooking });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};