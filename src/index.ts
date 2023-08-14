import express from 'express';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import connectDB from './config/dbConnect';
import errorHandler from './middleware/errorHandler';

const PORT = process.env.PORT || 3001;

dotenv.config();
connectDB();
const app = express();

// middlewares
app.use(express.json());
app.use(cookieParser());

// Route handlers
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`App running on port ${PORT}`);
    });
})
