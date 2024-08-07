import jwt from 'jsonwebtoken';

const jwtSecret = 'your_jwt_secret'; // Use environment variable in production

export const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.vendor = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export const isAdmin = (req, res, next) => {
    // Implement your admin verification logic here
    if (req.vendor && req.vendor.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
};
