
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Set up Multer with Cloudinary storage
// const storage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//       folder: 'uploads', // Cloudinary folder name
//       allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
//     },
//   });

const storage = multer.memoryStorage();

const arrayUpload = multer({storage}).array('file', 10); //joh name yahan hoga vahan vahi hoga req.file


  
//   export const upload = multer({ storage: storage })

export default arrayUpload;