import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config({
 path: ".env"

})
const databaseConnection =() => {
        mongoose.connect(process.env.MONGO_URL).then(() => {
        }).catch(() => {
        })
};
export default databaseConnection;