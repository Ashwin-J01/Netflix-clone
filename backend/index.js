import express from 'express';
import dotenv from 'dotenv';
import databaseConnection from './utlis/database.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoute.js';
import cors from 'cors';

databaseConnection();
dotenv.config({
    path: ".env"
})

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: "http://localhost:3000",
}
app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to Netflix Clone Backend",
    success: true
  });
});

//api
app.use("/api/v1/user", userRoutes);
//localhost:8080/api/v1/user/register


app.listen(process.env.PORT, () => {
  console.log(`Server listen at port ${process.env.PORT}`);
});