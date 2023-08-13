import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
require('dotenv').config();

import connectDB from './config/dbConnect';
import errorHandler from './middleware/errorHandler';

const PORT = process.env.PORT || 3001;

connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser());



app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}`);
    });
})
