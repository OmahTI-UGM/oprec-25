import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from '@routes/userRoutes';
import { connectDB } from '@config/dbconnection';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/auth', userRoutes);
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
