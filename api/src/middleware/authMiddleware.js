import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../constants.js";

export default (req, res, next) => {
    const token = req.headers['authorization'];
    if(!token) return res.status(401).json({
        success : false, 
        message : "Invalid token"
    });
    try {
        const decoded = jwt.verify(token , JWT_SECRET);
        req.id = decoded.id;
    } catch (err) {
        return res.status(401).json({
            success : false,
            message : "Token expired"
        });
    }
    return next();
}