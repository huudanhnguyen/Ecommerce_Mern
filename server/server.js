const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file  
const express = require('express');
const connectDB = require('./config/dbconnect.js');
const initRoutes = require('./routes/index.js'); // Import routes
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const cors = require('cors'); // Middleware for enabling CORS

const app = express();
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Allow requests from the client URL
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
})); // Enable CORS for all routes
app.set('query parser', 'extended');
app.use(express.json()); // Middleware to parse JSON data
app.use(express.urlencoded({ extended: true })); // Middleware to parse JSON and URL-encoded data
app.use(cookieParser());


const PORT = process.env.PORT || 8888;      // Default port if not specified in .env
connectDB(); // Connect to MongoDB
initRoutes(app); // Initialize routes

app.get('/', (req, res) => {
    res.send('server is running');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});