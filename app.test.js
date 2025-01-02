// const request = require('supertest');
// const app = require('./app');

// describe('Todo API Tests', () => {
//   test('POST /todos - Create valid todo', async () => {
//     const response = await request(app)
//       .post('/todos')
//       .type('form')
//       .send('task=Test task');
//     expect(response.statusCode).toBe(201);
//     expect(response.text).toBe('Todo added!');
//   });

//   test('GET /todos - List todos', async () => {
//     const response = await request(app).get('/todos');
//     expect(response.statusCode).toBe(200);
//     expect(Array.isArray(response.body)).toBe(true);
//   });
// });

const request = require('supertest');
const { app, server, todos } = require('./app');

describe('Todo API Tests', () => {
    beforeEach(() => {
        todos.length = 0;
    });

    afterAll(done => {
        if (server) server.close(done);
        else done();
    });

    test('POST /todos - Create valid todo', async () => {
        const response = await request(app)
            .post('/todos')
            .type('form')
            .send('task=Test task');
        expect(response.statusCode).toBe(201);
        expect(response.text).toBe('Todo added!');
    });

    test('GET /todos - List todos', async () => {
        const response = await request(app).get('/todos');
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBe(true);
    });
});