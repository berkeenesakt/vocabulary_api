// This file is the entry point of the application.
// It initializes the Express app, sets up middleware, and configures routes.

const express = require('express');
const app = express();
const routes = require('./routes/index');
const middleware = require('./middleware/index');
const connectDB = require('./config/database');

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route setup
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
// Initialize server with DB connection
const startServer = async () => {
    try {
        // Connect to MongoDB first
        await connectDB();
        
        // Start server only after successful DB connection
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();