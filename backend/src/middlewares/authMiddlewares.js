import jwt from 'jsonwebtoken';
import { Vendor } from '../../src/models/vendor.model.js';
import { Admin } from '../../src/models/admin.model.js';
import { User } from '../../src/models/user.model.js';

const jwtSecret = 'your_jwt_secret'; // Use environment variable in production






// Middleware to authenticate and authorize admin 
export const authenticateAndAuthorizeAdmin = async (req, res, next) => {
    console.log("we are in the function");
    const authHeader = req.header('Authorization');
    console.log("Testi",authHeader);
    const token = req.header('Authorization').replace('Bearer ', '');


    if (!token) {
        console.log("Not token?");
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        console.log("In token");
        const decoded = jwt.verify(token, jwtSecret);
        console.log("decodedd",decoded);
        const admin = await Admin.findById(decoded.userId);
        console.log("Admin founnd",admin);
        if (!admin) {
            return res.status(401).json({ message: 'Authorization denied: admin not found' });
        }

        req.admin = admin;
        console.log("leaving");
        next();
    } catch (error) {
        console.log("The error iss:",error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};


// Middleware to authenticate and authorize vendor
export const authenticateAndAuthorizeVendor = async (req, res, next) => {
    
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        const vendor = await Vendor.findById(decoded.userId);

        if (!vendor) {
            return res.status(401).json({ message: 'Authorization denied: admin not found' });
        }

        req.vendor = vendor;
        console.log("Leaving vendor auth");
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};







export const authenticateAndAuthorizeAdminOrVendor = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);

        let user;
        if (decoded.adminId) {
            // Check if the user is an admin
            user = await Admin.findById(decoded.adminId);
            if (!user) {
                return res.status(401).json({ message: 'Authorization denied: admin not found' });
            }
            req.admin = user; // Attach admin details to the request object
        } else if (decoded.vendorId) {
            // Check if the user is a vendor
            user = await Vendor.findById(decoded.vendorId);
            if (!user) {
                return res.status(401).json({ message: 'Authorization denied: vendor not found' });
            }
            req.vendor = user; // Attach vendor details to the request object
        } else {
            return res.status(401).json({ message: 'Authorization denied: invalid token' });
        }

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};




export const checkUserSignedIn = async (req, res, next) => {
    try {
       
        // Get the token from the Authorization header
        const token = req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'No token provided, authorization denied' });
        }

        // Verify the token
        const decoded = jwt.verify(token, jwtSecret);

        // Find the user associated with the token
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: 'Authorization denied: User not found' });
        }

        // Attach the user to the request object
        req.user = user;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};