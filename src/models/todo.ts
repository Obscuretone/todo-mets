import mongoose, { Schema, Document } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define a Todo interface
interface ITodo extends Document {
    _id: string; // Use string for UUID
    title: string;
    completed: boolean;
}

// Define the Todo schema
const TodoSchema: Schema = new Schema(
    {
        _id: { type: String, default: uuidv4 }, // Set UUID as default for _id
        title: { type: String, required: true },
        completed: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

// Create the Todo model
const Todo = mongoose.model<ITodo>('Todo', TodoSchema);

export default Todo;