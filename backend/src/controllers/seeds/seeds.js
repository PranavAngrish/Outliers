import { AcceptedExperience } from '../../models/acceptedExperience.model.js'; // Import your AcceptedExperience model

// Function to add demo experiences to the database
export const addDemoExperiences = async (req, res) => {
    try {
        // Define demo experiences
        const demoExperiences = [
            {
                title: 'Sunset Cruise',
                images: ['image1.jpg', 'image2.jpg'],
                description: 'Enjoy a beautiful sunset on a luxury cruise.',
                termsAndConditions: 'No refunds after 24 hours before the cruise.',
                price: 100,
                variants: [],
                addOns: ['Champagne', 'Dinner'],
                timeSlots: [new Date('2024-09-01T18:00:00'), new Date('2024-09-01T20:00:00')],
                MaximumCapacity: 50,
                cancellationPeriod: 48,
                state: 'florida',
                city: 'miami',
                category: 'adventure',
                vendor: 'vendorId1' // Replace with actual vendor ID
            },
            {
                title: 'Mountain Hiking Adventure',
                images: ['image3.jpg', 'image4.jpg'],
                description: 'A thrilling hike through the mountains with expert guides.',
                termsAndConditions: 'Participants must be 18 or older.',
                price: 150,
                variants: [],
                addOns: ['Lunch', 'Photography'],
                timeSlots: [new Date('2024-09-10T08:00:00'), new Date('2024-09-10T12:00:00')],
                MaximumCapacity: 20,
                cancellationPeriod: 24,
                state: 'colorado',
                city: 'denver',
                category: 'adventure',
                vendor: 'vendorId2' // Replace with actual vendor ID
            },
            {
                title: 'Wine Tasting Tour',
                images: ['image5.jpg', 'image6.jpg'],
                description: 'Explore the finest vineyards and enjoy exclusive wine tastings.',
                termsAndConditions: 'Must be 21 years or older.',
                price: 200,
                variants: [],
                addOns: ['Cheese Pairing', 'Souvenir Glass'],
                timeSlots: [new Date('2024-09-15T14:00:00'), new Date('2024-09-15T17:00:00')],
                MaximumCapacity: 30,
                cancellationPeriod: 72,
                state: 'california',
                city: 'napa',
                category: 'leisure',
                vendor: 'vendorId3' // Replace with actual vendor ID
            }
        ];

        // Insert demo experiences into the database
        await AcceptedExperience.insertMany(demoExperiences);

        res.status(201).json({ message: 'Demo experiences added successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
