import express from 'express';
import dotenv from 'dotenv';
import databaseConnection from './utlis/database.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoute.js';


databaseConnection();
dotenv.config({
    path: ".env"
})

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

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