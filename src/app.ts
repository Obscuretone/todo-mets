import express, { Application } from 'express';
import mongoose from 'mongoose';
import todoRoutes from './routes/todoRoutes';

const app: Application = express();
const PORT = 8080;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongo:27017/todo_app';

// Middleware
app.use(express.json());

// Connect to MongoDB
const connectMongoDB = async () => {
    if (process.env.NODE_ENV !== 'test') {
        try {
            await mongoose.connect(MONGO_URI);
            console.log('MongoDB Connected');
        } catch (err) {
            console.error('MongoDB Connection Error:', err);
        }
    }
};

// Start the server
const startServer = () => {
    if (process.env.NODE_ENV !== 'test') {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
};

// Initialize the app
const initializeApp = async () => {
    await connectMongoDB();
    app.use('/tasks', todoRoutes);
    app.get('/', (req, res) => {
        res.send('Welcome to the METS Todo App');
    });

    startServer();
};

initializeApp();

export default app;