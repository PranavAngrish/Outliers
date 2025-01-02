import { Vendor } from "../../models/vendor.model.js";
import bcrypt from 'bcrypt';
import { acceptExperience } from "../admin/adminAcceptance/adminAcceptanceController.js";


const saltRounds = 10;

// Seed function to add demo vendor data
export const seedVendors = async () => {
    try {
        // Define demo vendor data
        const demoVendors = [
            // {
            //     username: 'vendor1',
            //     email: 'vendor1@example.com',
            //     phoneNumber: 1234567890,
            //     password: 'password123',
            //     city: 'New York',
            //     state: 'NY',
            //     panCardNumber: 'ABCDE1234F',
            //     pancardImage: 'path/to/pancard/image1.jpg',
            //     gstNumber: '22ABCDE1234F1Z5',
            //     cancelledCheckImage: 'path/to/cancelled/check/image1.jpg',
            //     ifseCode: 'HDFC0000123',
            //     accountNumber: 123456789012,
            //     verificationStatus: "accepted",
            //     branchName: 'HDFC Bank, New York Branch'
            // },
            // {
            //     username: 'vendor2',
            //     email: 'vendor2@example.com',
            //     phoneNumber: 1234567890,
            //     password: 'password456',
            //     city: 'New York',
            //     state: 'NY',
            //     panCardNumber: 'ABCDE1234F',
            //     pancardImage: 'path/to/pancard/image1.jpg',
            //     gstNumber: '22ABCDE1234F1Z5',
            //     cancelledCheckImage: 'path/to/cancelled/check/image1.jpg',
            //     ifseCode: 'HDFC0000123',
            //     accountNumber: 123456789012,
            //     verificationStatus: "pending",
            //     branchName: 'HDFC Bank, New York Branch'
            // },
            {
                username: 'vendor3',
                email: 'vendor3@example.com',
                phoneNumber: 1234567890,
                password: 'password789',
                city: 'New York',
                state: 'NY',
                panCardNumber: 'ABCDE1234F',
                pancardImage: 'path/to/pancard/image1.jpg',
                gstNumber: '22ABCDE1234F1Z5',
                cancelledCheckImage: 'path/to/cancelled/check/image1.jpg',
                ifseCode: 'HDFC0000123',
                accountNumber: 123456789012,
                verificationStatus: "accepted",
                branchName: 'HDFC Bank, New York Branch',
                acceptedExperiences: ['66c055d6ab00d881ba60300b','66c055d6ab00d881ba60300d'],
                pendingExperiences: ['66c351ae12e52f76bb5cc240','66c351ae12e52f76bb5cc241']
            },
            
            // Add more demo vendors as needed
        ];

        // Loop through each vendor and add them to the database
        for (const vendorData of demoVendors) {
            // Hash the password
            const hashedPassword = await bcrypt.hash(vendorData.password, saltRounds);

            // Create new vendor
            const newVendor = new Vendor({
                ...vendorData,
                password: hashedPassword,
            });

            // Save the vendor to the database
            await newVendor.save();
        }

        console.log('Demo vendors added successfully');
    } catch (error) {
        console.error('Error seeding vendors:', error.message);
    }
};


