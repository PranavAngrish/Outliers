import jwt from 'jsonwebtoken';
import { Vendor } from '../../src/models/vendor.model.js';


const jwtSecret = 'your_jwt_secret'; // Use environment variable in production


export const isAdmin = (req, res, next) => {
    // Implement your admin verification logic here
    if (req.vendor && req.vendor.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
};


export const authenticate = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    // Check if token is not provided
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, jwtSecret);
        req.vendor = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};




export const authorizeVendorOrAdmin = async (req, res, next) => {
    const { vendorId } = req.params;
    const { vendor } = req;

    // Check if the user is an admin
    if (vendor.role === 'admin') {
        return next();
    }

    try {
        const vendorData = await Vendor.findById(vendorId);
        if (vendorData && vendorData._id.toString() === vendor.userId) {
            return next();
        } else {
            return res.status(403).json({ message: 'Forbidden: Not authorized' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
