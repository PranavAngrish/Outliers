import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Vendor } from '../../models/vendor.model.js'// Adjust the path as needed

const saltRounds = 10;
const jwtSecret = 'your_jwt_secret'; // Use environment variable in production
const jwtExpiry = '1h';

// Sign up
export const signUp = async (req, res) => {
    try {
        const { username, email, phoneNumber, password, city, state, panCardNumber, pancardImage, gstNumber, cancelledCheckImage, ifseCode, accountNumber, branchName } = req.body;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new vendor
        const newVendor = new Vendor({
            username,
            email,
            phoneNumber,
            password: hashedPassword,
            city,
            state,
            panCardNumber,
            pancardImage,
            gstNumber,
            cancelledCheckImage,
            ifseCode,
            accountNumber,
            branchName
        });

        await newVendor.save();

        res.status(201).json({ message: 'Vendor created successfully and pending verification' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Sign in
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the vendor by email
        const vendor = await Vendor.findOne({ email });

        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        // Check if vendor is accepted
        if (vendor.verificationStatus !== 'accepted') {
            return res.status(403).json({ message: 'Vendor not verified' });
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, vendor.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token
        const token = jwt.sign({ vendorId: vendor._id }, jwtSecret, { expiresIn: jwtExpiry });

        // Optional: Generate and save refresh token (for refresh token flow)
        const refreshToken = jwt.sign({ vendorId: vendor._id }, jwtSecret, { expiresIn: '7d' });
        vendor.refreshToken = refreshToken;
        await vendor.save();

        res.status(200).json({ token, refreshToken });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Log out
export const logOut = async (req, res) => {
    try {
        const { vendorId } = req.body;

        // Find the vendor by ID
        const vendor = await Vendor.findById(vendorId);

        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        // Clear the refresh token
        vendor.refreshToken = null;
        await vendor.save();

        res.status(200).json({ message: 'Vendor logged out successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete account
export const deleteAccount = async (req, res) => {
    try {
        const { vendorId } = req.body;
    
        // Find and delete the vendor by ID
        await Vendor.findByIdAndDelete(vendorId);

        res.status(200).json({ message: 'Vendor account deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


