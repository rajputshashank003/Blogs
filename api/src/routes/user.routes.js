import { Router } from "express";
import { jwtDecode } from "jwt-decode";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { JWT_SECRET } from "../constants.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRoutes = Router();
const prisma = new PrismaClient();

userRoutes.post("/signin", async (req, res) => {
    try {
        const { token } = req.body;
        const decodedData = jwtDecode(token.credential);
        const { email , name } = decodedData;

        let user = await prisma.user.findUnique({
            where: { email }
        });
        if(!user) {
            user = await prisma.user.create({
                data : {
                    email , 
                    name
                }
            })
        }
        const curr_token = jwt.sign(
            { 
                id : user.id
            }, 
            JWT_SECRET,
            {
                expiresIn : '12h'
            }
        );

        res.status(200).json({
            success : true,
            token : curr_token , 
            email : user.email ,
            isAdmin : user.isAdmin
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message});
    }
});

userRoutes.get("/verify", authMiddleware , async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where : {
                id : req.id , 
            }
        })
        res.status(200).json({
            success: true,
            message : user
        });
    } catch (err) {
        console.error("Verification Error:", err.message);
        res.status(401).json({ 
            success: false,
            message : "db error"
        });
    }
});

userRoutes.post("/admin/signin", async (req, res) => {
    try {
        const { email , password } = req.body;

        let user = await prisma.user.findUnique({
            where: { email , password }
        });
        if(!user) {
            throw new Error("user not found!");
        }
        const curr_token = jwt.sign(
            { 
                id : user.id
            }, 
            JWT_SECRET,
            {
                expiresIn : '12h'
            }
        );

        res.status(200).json({
            success : true,
            token : curr_token , 
            email : user.email ,
            isAdmin : user.isAdmin
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: error.message});
    }
})

export default userRoutes;