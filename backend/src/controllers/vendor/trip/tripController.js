import { Trip } from '../../../models/trip.model.js';
import { AcceptedExperience } from '../../../models/acceptedExperience.model.js';
import { AcceptedBooking } from '../../../models/acceptedBooking.model.js';
import { Vendor } from '../../../models/vendor.model.js';


export const createTrip = async (experienceId, dateTime, numberOfPeople, userId, remarks, ageOfPeople, addOns) => {
    try {
        const experience = await AcceptedExperience.findById(experienceId).populate('vendor');
        if (!experience) {
            throw new Error('Experience not found');
        }

        const vendorId = experience.vendor._id;

        // Check if a trip already exists for the given experience and dateTime
        let trip = await Trip.findOne({ experience: experienceId, dateTime });

        if (!trip) {
            // Create a new trip
            trip = new Trip({
                experience: experienceId,
                vendor: vendorId,
                dateTime,
                statusOfTrip: 'upcoming',
                numberOfPeopleOnboard: numberOfPeople, // Initialize with the number of people in the first booking
                bookings: []
            });

            await trip.save();
        } else {
            // Update the existing trip with the new number of people
            trip.numberOfPeopleOnboard += numberOfPeople;
        }

        // Create a new accepted booking
        const booking = new AcceptedBooking({
            user: userId,
            numberOfPeople,
            remarks,
            ageOfPeople,
            addOns,
            vendor: vendorId,
            trip: trip._id
        });

        await booking.save();

        trip.bookings.push(booking._id);
        await trip.save();

        return { trip, booking };
    } catch (error) {
        throw new Error(error.message);
    }
};