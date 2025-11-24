
// Example of GOOD code:
const express = require('express');
const router = express.Router(); 
const { connectDatabase } = require('../db/connection'); // No await here

// Route handlers are async functions, so await works fine here:
router.get('/search', async (req, res) => {
    // AWAIT is now safely inside an async function
    const db = await connectDatabase(); 
    // ... rest of your search logic ...
});