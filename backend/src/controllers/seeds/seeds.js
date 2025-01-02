import { AcceptedExperience } from '../../models/acceptedExperience.model.js'; // Import your AcceptedExperience model
import { PendingExperience } from '../../models/pendingExperience.model.js';

// Function to add demo experiences to the database
export const addDemoExperiences = async (req, res) => {
    try {
        console.log('Adding demo experiences...');
        // Define demo experiences
        const demoExperiences = [
            // Bike Riding
            {
                title: 'Pending Mountain Bike Adventure',
                images: ['bike1.jpg', 'bike2.jpg'],
                description: 'Experience an exhilarating ride through rugged mountain trails.',
                termsAndConditions: 'Helmet is required. Waiver must be signed.',
                price: 120,
                variants: [],
                addOns: ['Bike Rental', 'Guide Service'],
                timeSlots: [new Date('2024-09-05T09:00:00'), new Date('2024-09-05T13:00:00')],
                MaximumCapacity: 15,
                cancellationPeriod: 48,
                state: 'california',
                city: 'san francisco',
                category: 'Bike Riding',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            {
                title: 'Pending City Bike Tour',
                images: ['bike3.jpg', 'bike4.jpg'],
                description: 'Discover the city’s landmarks and hidden gems on a guided bike tour.',
                termsAndConditions: 'Must be able to ride a bike.',
                price: 80,
                variants: [],
                addOns: ['Lunch Stop', 'Photography'],
                timeSlots: [new Date('2024-09-12T10:00:00'), new Date('2024-09-12T14:00:00')],
                MaximumCapacity: 20,
                cancellationPeriod: 24,
                state: 'new york',
                city: 'new york',
                category: 'Bike Riding',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            {
                title: 'Pending Coastal Bike Ride',
                images: ['bike5.jpg', 'bike6.jpg'],
                description: 'Enjoy a scenic bike ride along the beautiful coastline.',
                termsAndConditions: 'Weather conditions may affect the ride.',
                price: 100,
                variants: [],
                addOns: ['Bike Upgrade', 'Beachside Snack'],
                timeSlots: [new Date('2024-09-20T08:00:00'), new Date('2024-09-20T12:00:00')],
                MaximumCapacity: 12,
                cancellationPeriod: 48,
                state: 'florida',
                city: 'miami',
                category: 'Bike Riding',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            
            // Walking Tour
            {
                title: 'PendingHistoric Downtown Walk',
                images: ['walk1.jpg', 'walk2.jpg'],
                description: 'Explore the rich history of downtown on a guided walking tour.',
                termsAndConditions: 'Wear comfortable shoes.',
                price: 50,
                variants: [],
                addOns: ['Audio Guide', 'Souvenir'],
                timeSlots: [new Date('2024-09-07T09:00:00'), new Date('2024-09-07T11:00:00')],
                MaximumCapacity: 25,
                cancellationPeriod: 24,
                state: 'texas',
                city: 'austin',
                category: 'Walking Tour',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            {
                title: 'PendingCultural City Walk',
                images: ['walk3.jpg', 'walk4.jpg'],
                description: 'Immerse yourself in the local culture with a guided walking tour of the city.',
                termsAndConditions: 'Includes walking for approximately 2 hours.',
                price: 60,
                variants: [],
                addOns: ['Local Snacks', 'Guidebook'],
                timeSlots: [new Date('2024-09-14T10:00:00'), new Date('2024-09-14T12:00:00')],
                MaximumCapacity: 30,
                cancellationPeriod: 48,
                state: 'illinois',
                city: 'chicago',
                category: 'Walking Tour',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            {
                title: 'PendingNature Trail Walk',
                images: ['walk5.jpg', 'walk6.jpg'],
                description: 'Enjoy a peaceful walk through a scenic nature trail.',
                termsAndConditions: 'Suitable for all ages.',
                price: 40,
                variants: [],
                addOns: ['Nature Guide', 'Binocular Rental'],
                timeSlots: [new Date('2024-09-18T08:00:00'), new Date('2024-09-18T10:00:00')],
                MaximumCapacity: 20,
                cancellationPeriod: 24,
                state: 'oregon',
                city: 'portland',
                category: 'Walking Tour',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            
            // Adventure
            {
                title: 'PendingRock Climbing Expedition',
                images: ['adventure1.jpg', 'adventure2.jpg'],
                description: 'Challenge yourself with an exciting rock climbing adventure.',
                termsAndConditions: 'Climbing gear provided. Fitness level required.',
                price: 180,
                variants: [],
                addOns: ['Professional Guide', 'Gear Rental'],
                timeSlots: [new Date('2024-09-08T07:00:00'), new Date('2024-09-08T12:00:00')],
                MaximumCapacity: 10,
                cancellationPeriod: 48,
                state: 'utah',
                city: 'salt lake city',
                category: 'Adventure',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            {
                title: 'Pending Zipline Thrill',
                images: ['adventure3.jpg', 'adventure4.jpg'],
                description: 'Soar above the treetops on a thrilling zipline adventure.',
                termsAndConditions: 'Weight limits apply. Safety briefing included.',
                price: 140,
                variants: [],
                addOns: ['Photo Package', 'Safety Gear'],
                timeSlots: [new Date('2024-09-11T10:00:00'), new Date('2024-09-11T14:00:00')],
                MaximumCapacity: 15,
                cancellationPeriod: 24,
                state: 'arizona',
                city: 'phoenix',
                category: 'Adventure',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            {
                title: 'Pending Scuba Diving Experience',
                images: ['adventure5.jpg', 'adventure6.jpg'],
                description: 'Explore underwater worlds with a guided scuba diving tour.',
                termsAndConditions: 'Diving certification required.',
                price: 220,
                variants: [],
                addOns: ['Dive Gear Rental', 'Underwater Photography'],
                timeSlots: [new Date('2024-09-22T08:00:00'), new Date('2024-09-22T12:00:00')],
                MaximumCapacity: 8,
                cancellationPeriod: 72,
                state: 'hawaii',
                city: 'honolulu',
                category: 'Adventure',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            
            // Culinary
            {
                title: 'Pending Gourmet Cooking Class',
                images: ['culinary1.jpg', 'culinary2.jpg'],
                description: 'Learn to cook gourmet meals with a professional chef.',
                termsAndConditions: 'Ingredients provided. No prior experience needed.',
                price: 130,
                variants: [],
                addOns: ['Recipe Book', 'Wine Pairing'],
                timeSlots: [new Date('2024-09-06T16:00:00'), new Date('2024-09-06T19:00:00')],
                MaximumCapacity: 12,
                cancellationPeriod: 24,
                state: 'new york',
                city: 'new york',
                category: 'Culinary',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            {
                title: 'Pending Wine and Cheese Tasting',
                images: ['culinary3.jpg', 'culinary4.jpg'],
                description: 'Savor a selection of fine wines and cheeses in a delightful tasting experience.',
                termsAndConditions: 'Must be 21 years or older.',
                price: 90,
                variants: [],
                addOns: ['Cheese Pairing', 'Sommelier Talk'],
                timeSlots: [new Date('2024-09-13T17:00:00'), new Date('2024-09-13T20:00:00')],
                MaximumCapacity: 20,
                cancellationPeriod: 48,
                state: 'texas',
                city: 'austin',
                category: 'Culinary',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            {
                title: 'Pending Farm-to-Table Dinner',
                images: ['culinary5.jpg', 'culinary6.jpg'],
                description: 'Enjoy a fresh and locally sourced dinner on a working farm.',
                termsAndConditions: 'Seasonal menu. Dietary restrictions accommodated.',
                price: 150,
                variants: [],
                addOns: ['Farm Tour', 'Chef Meet and Greet'],
                timeSlots: [new Date('2024-09-16T18:00:00'), new Date('2024-09-16T21:00:00')],
                MaximumCapacity: 25,
                cancellationPeriod: 48,
                state: 'california',
                city: 'los angeles',
                category: 'Culinary',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            
            // Cultural
            {
                title: 'Pending Traditional Dance Workshop',
                images: ['cultural1.jpg', 'cultural2.jpg'],
                description: 'Participate in a workshop to learn traditional dances from around the world.',
                termsAndConditions: 'Wear comfortable clothing.',
                price: 70,
                variants: [],
                addOns: ['Dance Shoes', 'Cultural Costume'],
                timeSlots: [new Date('2024-09-09T14:00:00'), new Date('2024-09-09T16:00:00')],
                MaximumCapacity: 30,
                cancellationPeriod: 24,
                state: 'florida',
                city: 'miami',
                category: 'Cultural',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            {
                title: 'Pending Local Arts and Crafts Tour',
                images: ['cultural3.jpg', 'cultural4.jpg'],
                description: 'Explore local arts and crafts through a guided tour of the best studios and shops.',
                termsAndConditions: 'Includes transportation.',
                price: 90,
                variants: [],
                addOns: ['Craft Workshop', 'Art Gallery Pass'],
                timeSlots: [new Date('2024-09-15T10:00:00'), new Date('2024-09-15T13:00:00')],
                MaximumCapacity: 20,
                cancellationPeriod: 24,
                state: 'colorado',
                city: 'denver',
                category: 'Cultural',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            {
                title: 'Pending Cultural Heritage Tour',
                images: ['cultural5.jpg', 'cultural6.jpg'],
                description: 'Delve into the rich cultural heritage of the region with a knowledgeable guide.',
                termsAndConditions: 'Includes entry fees to various sites.',
                price: 120,
                variants: [],
                addOns: ['Guided Commentary', 'Souvenir Book'],
                timeSlots: [new Date('2024-09-20T09:00:00'), new Date('2024-09-20T13:00:00')],
                MaximumCapacity: 15,
                cancellationPeriod: 48,
                state: 'georgia',
                city: 'atlanta',
                category: 'Cultural',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            
            // Wellness
            {
                title: 'Pending Yoga Retreat',
                images: ['wellness1.jpg', 'wellness2.jpg'],
                description: 'Relax and rejuvenate with a weekend yoga retreat in a tranquil setting.',
                termsAndConditions: 'Suitable for all levels. Meals included.',
                price: 250,
                variants: [],
                addOns: ['Massage Session', 'Wellness Workshop'],
                timeSlots: [new Date('2024-09-08T07:00:00'), new Date('2024-09-08T17:00:00')],
                MaximumCapacity: 12,
                cancellationPeriod: 72,
                state: 'california',
                city: 'san diego',
                category: 'Wellness',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            {
                title: 'Pending Meditation Workshop',
                images: ['wellness3.jpg', 'wellness4.jpg'],
                description: 'Join a workshop to learn various meditation techniques for relaxation and mindfulness.',
                termsAndConditions: 'No prior experience needed.',
                price: 60,
                variants: [],
                addOns: ['Meditation Mat', 'Tea Ceremony'],
                timeSlots: [new Date('2024-09-14T10:00:00'), new Date('2024-09-14T12:00:00')],
                MaximumCapacity: 25,
                cancellationPeriod: 24,
                state: 'new york',
                city: 'new york',
                category: 'Wellness',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            {
                title: 'Pending Spa Day Experience',
                images: ['wellness5.jpg', 'wellness6.jpg'],
                description: 'Indulge in a full day of relaxation and pampering at a luxury spa.',
                termsAndConditions: 'Includes all treatments. Gratuity not included.',
                price: 300,
                variants: [],
                addOns: ['Additional Treatments', 'Spa Lunch'],
                timeSlots: [new Date('2024-09-18T09:00:00'), new Date('2024-09-18T17:00:00')],
                MaximumCapacity: 8,
                cancellationPeriod: 48,
                state: 'florida',
                city: 'orlando',
                category: 'Wellness',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            
            // Nature
            {
                title: 'Pending Guided Nature Hike',
                images: ['nature1.jpg', 'nature2.jpg'],
                description: 'Explore stunning natural landscapes with an experienced guide.',
                termsAndConditions: 'Wear appropriate clothing and footwear.',
                price: 90,
                variants: [],
                addOns: ['Nature Guide', 'Binocular Rental'],
                timeSlots: [new Date('2024-09-11T08:00:00'), new Date('2024-09-11T12:00:00')],
                MaximumCapacity: 20,
                cancellationPeriod: 24,
                state: 'oregon',
                city: 'eugene',
                category: 'Nature',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            {
                title: 'Pending Wildlife Safari',
                images: ['nature3.jpg', 'nature4.jpg'],
                description: 'Experience the thrill of wildlife viewing in their natural habitat.',
                termsAndConditions: 'Includes safari vehicle. Binoculars recommended.',
                price: 200,
                variants: [],
                addOns: ['Photography Guide', 'Lunch'],
                timeSlots: [new Date('2024-09-17T06:00:00'), new Date('2024-09-17T14:00:00')],
                MaximumCapacity: 15,
                cancellationPeriod: 48,
                state: 'south carolina',
                city: 'charleston',
                category: 'Nature',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            {
                title: 'Pending Botanical Garden Tour',
                images: ['nature5.jpg', 'nature6.jpg'],
                description: 'Discover diverse plant species and beautiful gardens on a guided tour.',
                termsAndConditions: 'Includes garden entry fees.',
                price: 70,
                variants: [],
                addOns: ['Plant Guide', 'Tea Service'],
                timeSlots: [new Date('2024-09-21T10:00:00'), new Date('2024-09-21T12:00:00')],
                MaximumCapacity: 25,
                cancellationPeriod: 24,
                state: 'texas',
                city: 'houston',
                category: 'Nature',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            
            // Historical
            {
                title: 'Pending Ancient Ruins Exploration',
                images: ['historical1.jpg', 'historical2.jpg'],
                description: 'Explore ancient ruins and learn about their history on a guided tour.',
                termsAndConditions: 'Walking required. Includes site entry fees.',
                price: 120,
                variants: [],
                addOns: ['Expert Guide', 'Souvenir'],
                timeSlots: [new Date('2024-09-09T08:00:00'), new Date('2024-09-09T12:00:00')],
                MaximumCapacity: 15,
                cancellationPeriod: 48,
                state: 'arizona',
                city: 'tucson',
                category: 'Historical',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            {
                title: 'Pending Medieval Castle Tour',
                images: ['historical3.jpg', 'historical4.jpg'],
                description: 'Step back in time with a tour of a medieval castle and its grounds.',
                termsAndConditions: 'Includes castle entry. Wear comfortable footwear.',
                price: 110,
                variants: [],
                addOns: ['Castle Guide', 'Historical Book'],
                timeSlots: [new Date('2024-09-12T09:00:00'), new Date('2024-09-12T13:00:00')],
                MaximumCapacity: 20,
                cancellationPeriod: 24,
                state: 'england',
                city: 'london',
                category: 'Historical',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            },
            {
                title: 'Pending Revolutionary War Tour',
                images: ['historical5.jpg', 'historical6.jpg'],
                description: 'Learn about the Revolutionary War through a comprehensive guided tour.',
                termsAndConditions: 'Includes museum entry fees.',
                price: 95,
                variants: [],
                addOns: ['Guidebook', 'Historical Map'],
                timeSlots: [new Date('2024-09-20T10:00:00'), new Date('2024-09-20T13:00:00')],
                MaximumCapacity: 30,
                cancellationPeriod: 48,
                state: 'massachusetts',
                city: 'boston',
                category: 'Historical',
                vendor: '64dcd3e5c15b2a9d8f6b7a1e' // Replace with actual vendor ID
            }
        ];
        
        console.log("Here");

        // Insert demo experiences into the database
        await AcceptedExperience.updateMany({vendor: '64dcd3e5c15b2a9d8f6b7a1e'}, {
            $set:{
                vendor: '66c3522bf70b2422cabaf517'
            }
        });
        console.log("done");

        res.status(201).json({ message: 'Demo experiences added successfully' });
    } catch (error) {
        res.status(500).json({message:`we have some error error: ${error.message}` });
    }
};


// functions to add demo vendors to the database

