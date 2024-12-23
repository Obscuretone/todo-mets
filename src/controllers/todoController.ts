import { Request, Response } from 'express';
import Todo from '../models/todo';

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error: unknown) {  // Specify the 'unknown' type for the caught error
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

export const createTodo = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;
        const newTodo = await Todo.create({ title });
        res.status(201).json(newTodo);
    } catch (error: unknown) {  // Specify the 'unknown' type for the caught error
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;
        const updatedTodo = await Todo.findByIdAndUpdate(id, { title, completed }, { new: true });
        res.status(200).json(updatedTodo);
    } catch (error: unknown) {  // Specify the 'unknown' type for the caught error
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: 'Todo deleted' });
    } catch (error: unknown) {  // Specify the 'unknown' type for the caught error
        if (error instanceof Error) {
            res.status(500).json({ message: error.message });
        } else {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};