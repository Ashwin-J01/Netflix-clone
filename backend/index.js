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
// Allow origin(s) from env. Provide a comma-separated `CLIENT_URL` env var
// e.g. CLIENT_URL=https://your-frontend.onrender.com,https://yourusername.github.io
const rawClientUrls = process.env.CLIENT_URL || '';
const allowedOrigins = rawClientUrls
    ? rawClientUrls.split(',').map(s => s.trim()).filter(Boolean)
    : [
            'http://localhost:3000',
            'https://ashwin-j01.github.io',
            'https://yourusername.github.io'
        ];

const corsOptions = {
    origin: (origin, callback) => {
        // allow requests with no origin (e.g., mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            return callback(null, true);
        }
        return callback(new Error('CORS policy: This origin is not allowed: ' + origin));
    },
    credentials: true
};

app.use(cors(corsOptions));
 
// api
app.use("/api/v1/user", userRoute);
//localhost:8080/api/v1/user/register
app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
});
