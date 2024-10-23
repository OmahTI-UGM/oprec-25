import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import userRoutes from '@routes/userRoutes';
import divisiRoutes from '@routes/divisiRoutes';
import wawancaraRoutes from '@routes/wawancaraRoutes';
import { connectDB } from '@config/dbconnection';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

connectDB();

app.use('/auth', userRoutes);
app.use('/divisi', divisiRoutes);
app.use('/wawancara', wawancaraRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port P${PORT}`);
});
