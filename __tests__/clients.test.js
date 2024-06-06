const request = require('supertest');
const { ObjectId } = require('mongodb');
const app = require('../server');
const mongodb = require('../data/database');

jest.mock('../data/database');

describe('Clients API', () => {
  // Mocked client data
  const mockClientId = new ObjectId();
  const mockClient = {
    _id: mockClientId.toHexString(),
    username: 'mockUsername',
    firstName: 'Mock',
    lastName: 'User',
    address: 'Mock Address',
    birthdate: '1990-01-01',
    email: 'mock@example.com',
    membershipStatus: 'active',
    membershipTier: 'gold'
  };

  describe('GET /clients', () => {
    it('should return all clients', async () => {
      mongodb.getDatabase.mockReturnValueOnce({
        db: () => ({
          collection: () => ({
            find: jest.fn().mockReturnValueOnce({
              toArray: jest.fn().mockResolvedValueOnce([mockClient]),
            }),
          }),
        }),
      });

      const response = await request(app).get('/clients');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([mockClient]);
    });
  });

  describe('GET /clients/:id', () => {
    it('should return a single client by ID', async () => {
      mongodb.getDatabase.mockReturnValueOnce({
        db: () => ({
          collection: () => ({
            findOne: jest.fn().mockResolvedValueOnce(mockClient),
          }),
        }),
      });

      const response = await request(app).get(`/clients/${mockClientId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockClient);
    });

    it('should return a 404 status code for non-existent client ID', async () => {
      const nonExistentClientId = new ObjectId();
      mongodb.getDatabase.mockReturnValueOnce({
        db: () => ({
          collection: () => ({
            findOne: jest.fn().mockResolvedValueOnce(null),
          }),
        }),
      });

      const response = await request(app).get(`/clients/${nonExistentClientId}`);
      expect(response.statusCode).toBe(404);
    });
  });
});
