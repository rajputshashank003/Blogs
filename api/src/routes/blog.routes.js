import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { storage } from "../config/cloudinary.config.js";
import multer from "multer";
import { PrismaClient } from "@prisma/client";

const blogRoutes = Router();
const upload = multer( { storage} );
const prisma = new PrismaClient();

blogRoutes.post("/create", 
    authMiddleware, 
    upload.single("file") , 
    async ( req , res ) => {
        try {
            if (!req.file) {
                return res.status(400).send("No image file uploaded!");
            }
            const image = req.file.path;
            const { title , description } = req.body;
            const blog = await prisma.blog.create({
                data : {
                    title,
                    description,
                    image
                }
            })
            res.status(200).json({
                success : true, 
                id : blog.id
            })
        } catch (e) {
            console.log(e.message);
            res.status(404).json({
                success : false,
                messaeg : e.message
            })
        }
    }
)

blogRoutes.get("/" ,async (req, res) => {
    try {
        const blogs = await prisma.blog.findMany();
        res.status(200).json({
            success : true, 
            blogs
        })
    } catch (e) {
        console.log(e.message);
        res.status(404).json({
            success : false,
            messaeg : e.message
        })
    }
})

blogRoutes.get("/:id" ,async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await prisma.blog.findUnique({
            where : {
                id
            }
        });
        res.status(200).json({
            success : true, 
            blog
        })
    } catch (e) {
        console.log(e.message);
        res.status(404).json({
            success : false,
            messaeg : e.message
        })
    }
})

export default blogRoutes;