import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import app from '../app'; // Import the Express app

let mongoServer: MongoMemoryServer;
let server: any;  // Declare server to be able to close it later

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);

    // Start the server in the beforeAll hook
    server = app.listen(0);  // Listen on a random available port
});

afterAll(async () => {
    // Close the server after tests are complete
    await mongoose.disconnect();
    await mongoServer.stop();
    server.close();  // Close the Express server to stop Jest from hanging
});

describe('Todo Routes', () => {
    it('should get all todos', async () => {
        const response = await request(server).get('/tasks');
        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it('should create a new todo', async () => {
        const newTodo = { title: 'Test Todo' };
        const response = await request(server).post('/tasks').send(newTodo);
        expect(response.status).toBe(201);
        expect(response.body.title).toBe(newTodo.title);
    });

    it('should update a todo', async () => {
        const newTodo = { title: 'Test Todo' };
        const createResponse = await request(server).post('/tasks').send(newTodo);
        const todoId = createResponse.body._id;

        const updatedTodo = { title: 'Updated Todo', completed: true };
        const updateResponse = await request(server).put(`/tasks/${todoId}`).send(updatedTodo);
        expect(updateResponse.status).toBe(200);
        expect(updateResponse.body.title).toBe(updatedTodo.title);
        expect(updateResponse.body.completed).toBe(updatedTodo.completed);
    });

    it('should delete a todo', async () => {
        const newTodo = { title: 'Test Todo' };
        const createResponse = await request(server).post('/tasks').send(newTodo);
        const todoId = createResponse.body._id;

        const deleteResponse = await request(server).delete(`/tasks/${todoId}`);
        expect(deleteResponse.status).toBe(200);
        expect(deleteResponse.body.message).toBe('Todo deleted');
    });
});