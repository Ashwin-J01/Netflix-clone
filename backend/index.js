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

// CORS configuration: only allow the deployed frontend and localhost during development
const allowedOrigins = [
    "https://netflix-clone-gamma-orcin-58.vercel.app",
    "http://localhost:3000"
];

const corsConfig = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsConfig));
app.options("*", cors(corsConfig)); // VERY IMPORTANT for preflight

// Ensure Access-Control-Allow-Credentials header is present
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Allow standard headers including Authorization (for JWT) on preflight
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});
 
// api
app.use("/api/v1/user", userRoute);
//localhost:8080/api/v1/user/register
app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
});
