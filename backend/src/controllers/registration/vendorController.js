import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Vendor } from '../../models/vendor.model.js'// Adjust the path as needed
import { PendingExperience } from '../../models/pendingExperience.model.js';
import { AcceptedExperience } from '../../models/acceptedExperience.model.js';

const saltRounds = 10;
const jwtSecret = 'your_jwt_secret'; // Use environment variable in production
const jwtExpiry = '1h';

// Sign up
export const signUp = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phoneNumber, panCardNumber, gstNumber, password, state, city, accountNumber, ifseCode, branchName} = req.body;
         // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const vendor = await Vendor.findOne({ email });
        if(vendor){
            return res.status(202).json({message: "A vendor under this email already exists, please logIn to that"});
        }
        console.log("Hi");
        // Create new vendor
        const newVendor = new Vendor({
            username,
            email,
            phoneNumber,
            password: hashedPassword,
            city,
            state,
            panCardNumber,
            gstNumber,
            ifseCode,
            accountNumber,
            branchName
        });
        console.log("created");

        await newVendor.save();
        console.log("saved");

        res.status(201).json({ message: "Your information has been sent to the admin, we will get back to you as soon as we review your profile" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message });
    }
};

// Sign in
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("We are in the function");

        // Find the vendor by email
        const vendor = await Vendor.findOne({ email });


        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        // Check if vendor is accepted
        if (vendor.verificationStatus !== 'accepted') {
            console.log("Kahan?")
            return res.status(403).json({ message: 'You are not yet verified by the admin, please be patient while we review your profile' });
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

        // Exclude the password from the user object
        const { password: _, ...vendorDetails } = vendor.toObject();


        res.status(200).json({ token, refreshToken,vendor: vendorDetails });
    } catch (error) {
        console.log("The error is ", error);
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

        // Find the vendor by ID
        const vendor = await Vendor.findById(vendorId);
        if (!vendor) {
            return res.status(404).json({ message: 'Vendor not found' });
        }

        // Delete all pending experiences of the vendor
        await PendingExperience.deleteMany({ vendor: vendorId });

        // Delete all accepted experiences of the vendor
        await AcceptedExperience.deleteMany({ vendor: vendorId });

        // Delete the vendor account
        await Vendor.findByIdAndDelete(vendorId);

        res.status(200).json({ message: 'Vendor account and related experiences deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


