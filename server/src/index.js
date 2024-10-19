import express from 'express';
import { connectDb } from './db/index.js';
import dotenv from 'dotenv';
import studentRouter from './routes/student.route.js';
import cors from 'cors';

dotenv.config({ path: './.env' });

const app = express();
const port = process.env.PORT || 4000;

// CORS configuration to allow requests from any origin
app.use(cors({
        origin: process.env.FRONTEND_URI, // Use your frontend URL here
        methods: ['GET', 'POST', 'OPTIONS'], // Make sure OPTIONS is included
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true // If you're sending credentials
}));

app.use(express.json());
app.use('/api/student', studentRouter);

// Basic route for testing
app.use('/', (req, res) => {
    res.send('Welcome its Working Salahudin');
});

// Connect to the database and start the server
connectDb()
    .then(
        app.listen(port, () => {
            console.log(`Running on ${port}`);
        })
    )
    .catch((error) => {
        console.log(error);
    });
