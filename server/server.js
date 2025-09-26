const dotenv = require('dotenv');
dotenv.config(); // Load environment variables from .env file  
const express = require('express');
const connectDB = require('./config/dbconnect.js');
const initRoutes = require('./routes/index.js'); // Import routes
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const cors = require('cors'); // Middleware for enabling CORS

const app = express();
app.use(cors({
    origin: ['http://localhost:5172', 'http://localhost:5173', 'http://localhost:5174'], // Allow requests from all client URLs
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allowed headers
})); // Enable CORS for all routes
app.set('query parser', 'extended');
app.use(express.json()); // Middleware to parse JSON data
app.use(express.urlencoded({ extended: true })); // Middleware to parse JSON and URL-encoded data
app.use(cookieParser());

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'));


const PORT = process.env.PORT || 8888;      // Default port if not specified in .env
connectDB(); // Connect to MongoDB
initRoutes(app); // Initialize routes

app.get('/', (req, res) => {
    res.send('server is running');
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});