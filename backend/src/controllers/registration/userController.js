import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../../models/user.model.js'; // Adjust the path as needed

const saltRounds = 10;
const jwtSecret = 'your_jwt_secret'; // Use environment variable in production
const jwtExpiry = '1h';

// Sign up
export const signUp = async (req, res) => {
    try {
        const { name, city, state, age, phoneNumber, emailId, password, occupation } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = new User({
            name,
            city,
            state,
            age,
            phoneNumber,
            emailId,
            password: hashedPassword,
            occupation
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Sign in
export const signIn = async (req, res) => {
    try {
        const { emailId, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ emailId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: jwtExpiry });

        // Optional: Generate and save refresh token (for refresh token flow)
        const refreshToken = jwt.sign({ userId: user._id }, jwtSecret, { expiresIn: '7d' });
        user.refreshToken = refreshToken;
        await user.save();

        res.status(200).json({ token, refreshToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Log out
export const logOut = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Clear the refresh token
        user.refreshToken = null;
        await user.save();

        res.status(200).json({ message: 'User logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
