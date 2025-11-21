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

// CORS configuration with explicit preflight handling
const corsConfig = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        // But in production, you might want to reject these
        if (!origin) {
            return callback(null, true);
        }
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            // Log for debugging
            console.log("CORS blocked origin:", origin);
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept", "Origin"],
    exposedHeaders: ["Set-Cookie"],
    preflightContinue: false,
    optionsSuccessStatus: 204
};

// Apply CORS middleware to all routes
app.use(cors(corsConfig));

// Explicitly handle preflight requests for all routes
app.options("*", (req, res) => {
    const origin = req.headers.origin;
    // When credentials are true, Access-Control-Allow-Origin cannot be "*"
    // It must be the specific origin making the request
    if (origin && allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("Access-Control-Max-Age", "86400"); // 24 hours
        return res.status(204).send();
    } else if (!origin) {
        // Handle requests with no origin (like Postman or curl)
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS, PATCH");
        res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, Accept, Origin");
        return res.status(204).send();
    }
    // Origin not allowed
    console.log("Preflight CORS blocked origin:", origin);
    res.status(403).send("Not allowed by CORS");
});
 
// api
app.use("/api/v1/user", userRoute);
//localhost:8080/api/v1/user/register
app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
});
