const request = require('supertest');
const app = require('./app');

describe('Todo App API Tests', () => {
  test('GET /todos - should return an empty array initially', async () => {
    const response = await request(app).get('/todos');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([]);
  });

  test('POST /todos - should add a new todo', async () => {
    const response = await request(app).post('/todos').send({ task: 'Learn Node.js' });
    expect(response.statusCode).toBe(201);
    expect(response.text).toBe('Todo added!');
  });

  test('POST /todos - should return 400 if task is empty', async () => {
    const response = await request(app).post('/todos').send({ task: '' });
    expect(response.statusCode).toBe(400);
    expect(response.text).toBe('Task cannot be empty');
  });

  test('DELETE /todos/:id - should delete a todo by id', async () => {
    // First, create a todo
    const postResponse = await request(app).post('/todos').send({ task: 'Learn testing' });
    expect(postResponse.statusCode).toBe(201);

    // Then, delete it
    const todos = await request(app).get('/todos');
    const todoId = todos.body[0].id;

    const deleteResponse = await request(app).delete(`/todos/${todoId}`);
    expect(deleteResponse.statusCode).toBe(200);
    expect(deleteResponse.text).toBe('Todo deleted!');
  });

  test('DELETE /todos/:id - should return 404 if todo not found', async () => {
    const response = await request(app).delete('/todos/99999'); // Non-existent ID
    expect(response.statusCode).toBe(404);
    expect(response.text).toBe('Todo not found');
  });
});
