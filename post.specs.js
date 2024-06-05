const app = require('../server')
const supertest = require('supertest');
const { expect, test } = require('@jest/globals');
const request = supertest(app)

/*
describe('Test Handlers', () => {
    test('responds to post /clients', async () => {
        const res = await request.post('/clients').send(    {
            username: "tmayers",
            firstName: "trevor",
            lastName: "mayers",
            address: "52 Lawson",
            birthdate: "1990-11-05",
            email: "tmayers@email.email",
            membershipStatus: "active",
            membershipTier: "bronze",
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201)
    })    
})
*/


describe('Test Handlers', () => {
    test('responds to post /users', async () => {
        const res = await request.post('/users').send(    {
            firstName: "Emily",
            lastName: "Button",
            email: "emilyButton@gmail.com",
            age: 25,
        });
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201)
    })

    
})