const request = require('supertest');
const express = require('express');
const app = require('express');

describe('Test the root path', () => {
    test('It should response the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
});

describe('Test the adminAuth middleware', () => {
    test('It should return 401 if credentials are invalid', async () => {
        const response = await request(app).post('/create-driver')
            .set('username', 'admin')
            .set('password', 'wrongpassword');
        expect(response.statusCode).toBe(401);
        expect(response.body.message).toBe('Invalid credentials');
    });
    test('It should return 200 if credentials are valid', async () => {
        const response = await request(app).post('/create-driver')
            .set('username', 'admin')
            .set('password', 'password')
            .send({ name: 'test driver' });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Driver created');
        expect(response.body.driver.name).toBe('test driver');
    });
});

describe('Test the create-driver endpoint', () => {
    test('It should return 201 and create the driver', async () => {
        const response = await request(app).post('/create-driver')
            .set('username', 'admin')
            .set('password', 'password')
            .send({ name: 'test driver' });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Driver created');
        expect(response.body.driver.name).toBe('test driver');
    });
});

describe('Test the suspend-driver endpoint', () => {
    test('It should return 200 and suspend the driver', async () => {
        const response = await request(app).put('/suspend-driver/1')
            .set('username', 'admin')
            .set('password', 'password');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Driver suspended');
        expect(response.body.driver.status).toBe('suspended');
    });
    test('It should return 404 if driver is not found', async () => {
        const response = await request(app).put('/suspend-driver/3')
            .set('username', 'admin')
            .set('password', 'password');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Driver not found');
    });
});

describe('Test the register-passenger endpoint', () => {
    test('It should return 201 and register the passenger', async () => {
        const response = await request(app).post('/register-passenger')
            .send({ name: 'test passenger' });
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('Passenger registered');
        expect(response.body.passenger.name).toBe('test passenger');
        });
        });
        
        describe('Test the start-ride endpoint', () => {
        test('It should return 200 and start the ride', async () => {
        const response = await request(app).post('/start-ride/1/1')
        .set('username', 'admin')
        .set('password', 'password');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Ride started');
        expect(response.body.ride.status).toBe('ongoing');
        expect(response.body.ride.passenger.id).toBe(1);
        expect(response.body.ride.driver.id).toBe(1);
        });
        test('It should return 404 if passenger is not found', async () => {
        const response = await request(app).post('/start-ride/3/1')
        .set('username', 'admin')
        .set('password', 'password');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Passenger not found');
        });
        test('It should return 404 if driver is not found', async () => {
        const response = await request(app).post('/start-ride/1/3')
        .set('username', 'admin')
        .set('password', 'password');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Driver not found');
        });
        });
        
        describe('Test the end-ride endpoint', () => {
        test('It should return 200 and end the ride', async () => {
        const response = await request(app).put('/end-ride/1')
        .set('username', 'admin')
        .set('password', 'password');
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe('Ride ended');
        expect(response.body.ride.status).toBe('completed');
        });
        test('It should return 404 if ride is not found', async () => {
        const response = await request(app).put('/end-ride/3')
        .set('username', 'admin')
        .set('password', 'password');
        expect(response.statusCode).toBe(404);
        expect(response.body.message).toBe('Ride not found');
        });
        });
        
        describe('Test the rides endpoint', () => {
        test('It should return 200 and the list of rides', async () => {
        const response = await request(app).get('/rides')
        .set('username', 'admin')
        .set('password', 'password');
        expect(response.statusCode).toBe(200);
        expect(response.body.rides).toBeDefined();
        });
        });