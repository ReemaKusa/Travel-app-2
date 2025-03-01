// src/server/__test__/server.test.js

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const mockAPIResponse = require('./mockAPI.test');
const app = express();

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/test', (req, res) => res.send(mockAPIResponse));

app.post('/all-apis', (req, res) => {
    // Mock implementation for testing
    const { destination } = req.body;
    if (!destination) {
        return res.status(400).json({ error: 'Destination is required' });
    }
    res.status(200).json({ message: 'Success', destination });
});

describe('Express Server', () => {
    it('should respond with mock API data', async () => {
        const response = await request(app).get('/test');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockAPIResponse);
    });

    it('should return 400 if destination is not provided', async () => {
        const response = await request(app).post('/all-apis').send({});
        expect(response.status).toBe(400);
        expect(response.body.error).toBe('Destination is required');
    });

    it('should return success message with destination', async () => {
        const response = await request(app).post('/all-apis').send({ destination: 'Paris' });
        expect(response.status).toBe(200);
        expect(response.body.message).toBe('Success');
        expect(response.body.destination).toBe('Paris');
    });
});