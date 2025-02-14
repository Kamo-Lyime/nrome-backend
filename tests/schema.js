// tests/schema.test.js
const mongoose = require('mongoose');
const { Patient, Order, Delivery } = require('../models/schema');

describe('Database Schema Tests', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb://localhost:27017/test-db');
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    it('should create a patient', async () => {
        const patient = new Patient({
            name: 'John Doe',
            email: 'john@example.com',
            phone: '123-456-7890',
            address: '123 Main St'
        });
        await patient.save();
        expect(patient._id).toBeDefined();
    });
});