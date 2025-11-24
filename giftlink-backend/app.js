/*jshint esversion: 8 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// --- Logger Setup ---
// The logger needs to be imported first so pinoHttp can use it.
const logger = require('./logger'); 
const pinoHttp = require('pino-http');

// --- Database Connection Utility ---
// Correctly importing the connection function from the expected location './db/connection'
const { connectToDatabase } = require('./db/connection'); 

// --- Express App Setup ---
const app = express();
app.use(cors()); // Simplified cors(*) 
const port = 3060;

// Middleware
app.use(pinoHttp({ logger }));
app.use(express.json());


// --- Route Imports ---
// Gift API Task 1: import the giftRoutes and store in a constant called giftRoutes
const giftRoutes = require('./routes/giftRoutes'); 
// Search API Task 1: import the searchRoutes and store in a constant called searchRoutes
const searchRoutes = require('./routes/searchRoutes');


// --- Use Routes ---
// Gift API Task 2: add the giftRoutes to the server by using the app.use() method.
app.use('/api/gifts', giftRoutes);
// Search API Task 2: add the searchRoutes to the server by using the app.use() method.
app.use('/api/search', searchRoutes);


// --- Server Initialization (Only ONE app.listen call) ---

// Connect to MongoDB, and only start the server after a successful connection.
connectToDatabase().then(() => {
    app.listen(port, () => {
        logger.info(`Server running on port ${port}`);
        // loadData(); // If you need to load data automatically, call it here.
    });
}).catch(error => {
    logger.error("Failed to start server due to database error:", error);
    process.exit(1); // Exit if DB connection fails
});


// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err);
    // Use the logger for consistency
    logger.error(`Global Error Handler: ${err.message}`, { stack: err.stack });
    res.status(500).send('Internal Server Error');
});

app.get("/",(req,res)=>{
    res.send("Inside the server")
});