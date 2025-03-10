import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { cloud_name , api_key, api_secret } from "../constants.js";

cloudinary.config({
    cloud_name,
    api_key,
    api_secret
});

export const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Your Blog',
      allowedFormats: ["png" ,"jpeg", "jpg"],
      transformation: [
        { quality: "80", fetch_format: "auto" }
      ]
    },
});
