import express from "express";
import blogRoutes from "./routes/blog.routes.js";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes.js";
dotenv.config();
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors({credentials: true , origin: '*'}));

app.get("/" , (req, res) => {
    res.status(200).json({
        success : true,
        message : "Server working "
    })
}) 

app.use("/api/blog" , blogRoutes);
app.use("/api/user", userRoutes);

app.listen("8000", () => console.log("listening on port 8000"));

export default app;