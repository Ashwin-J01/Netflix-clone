//step-1
// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utlis/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";

databaseConnection();

dotenv.config({
    path:".env"
})

const app = express();
//middlewares 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

// CORS: allow only the production frontend origin (or set via CLIENT_URL env)
const clientOrigin = process.env.CLIENT_URL || "https://netflix-clone-gamma-orcin-58.vercel.app";
app.use(cors({
    origin: clientOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
 
// api
app.use("/api/v1/user", userRoute);
//localhost:8080/api/v1/user/register
app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
});
