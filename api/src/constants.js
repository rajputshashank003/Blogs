import dotenv from "dotenv";
dotenv.config();

export const JWT_SECRET=process.env.JWT_SECRET;

export const cloud_name = process.env.CLOUD_NAME;
export const api_key = process.env.CLOUD_API_KEY;
export const api_secret = process.env.CLOUD_API_SECRET;