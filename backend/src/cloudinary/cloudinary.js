import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import fetch from 'node-fetch';


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


export const blobToFile = async (blobUrl) => {
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new File([blob], 'image.png', { type: blob.type });
  } catch (error) {
    console.error('Error converting blob to file:', error);
    throw error;
  }
};


export const uploadToCloudinary = async (image) => {
  try {
    console.log("The image is", image);
    const uploadResponse = await cloudinary.uploader.upload(image,{
        resource_type: "auto"
    });
    console.log("The upload response is successful, the url is",uploadResponse);
    return uploadResponse.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    fs.unlinkSync(image); // Delete the image from the server
    throw error;
  }
};