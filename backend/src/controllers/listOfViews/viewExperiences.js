import {AcceptedExperience} from '../../models/acceptedExperience.model.js';



// Function to get experiences by category
export const getExperiencesByCategory = async (req, res) => {
    try {
        const { category } = req.query;

        const experiences = await AcceptedExperience.find({ category }).populate('vendor', 'username email');
        if (!experiences.length) {
            return res.status(404).json({ message: 'No experiences found for this category' });
        }

        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



// Function to get experiences by state
export const getExperiencesByState = async (req, res) => {
    try {
        const { state } = req.query;

        const experiences = await AcceptedExperience.find({ state }).populate('vendor', 'username email');
        if (!experiences.length) {
            return res.status(404).json({ message: 'No experiences found for this state' });
        }

        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Function to get random experiences
export const getRandomExperiences = async (req, res) => {
    try {
        const experiencesCount = await AcceptedExperience.countDocuments();
        const randomIndex = Math.floor(Math.random() * experiencesCount);

        const experiences = await AcceptedExperience.find().skip(randomIndex).limit(10).populate('vendor', 'username email');
        if (!experiences.length) {
            return res.status(404).json({ message: 'No experiences found' });
        }

        res.status(200).json(experiences);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

