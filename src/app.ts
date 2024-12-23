import express, { Application } from 'express';
import mongoose from 'mongoose';
import todoRoutes from './routes/todoRoutes';
import { appUp, requestMetricsMiddleware, metricsEndpoint } from './metrics';

const app: Application = express();
const PORT = 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/todo_app';

// Middleware
app.use(express.json());
app.use(requestMetricsMiddleware);  // Use the middleware for tracking requests

// Metrics endpoint
app.get('/metrics', metricsEndpoint);

// Connect to MongoDB with condition for test environment
if (process.env.NODE_ENV !== 'test') {
    mongoose
        .connect(MONGO_URI)
        .then(() => {
            console.log('MongoDB Connected');
            appUp.set(1); // Update the 'up' metric when connected to MongoDB
        })
        .catch((err) => {
            console.error('MongoDB Connection Error:', err);
            appUp.set(0); // Update the 'up' metric if there is an error
        });
}

// Use routes
app.use('/tasks', todoRoutes);

// Basic route
app.get('/', (req, res) => {
    res.send('Welcome to the METS Todo App');
});

// Start the server
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;