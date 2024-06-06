const request = require('supertest');
const { ObjectId } = require('mongodb');
const app = require('../server');
const mongodb = require('../data/database');

jest.mock('../data/database');

describe('Staff API', () => {
  // Mocked staff data
  const mockStaffId = new ObjectId();
  const mockStaff = {
    _id: mockStaffId.toHexString(),
    name: 'Mock Staff',
    position: 'Manager',
    department: 'Administration',
    email: 'staff@example.com',
    phone: '1234567890',
    hireDate: '2020-01-01',
    salary: 50000
  };

  describe('GET /staff', () => {
    it('should return all staff members', async () => {
      mongodb.getDatabase.mockReturnValueOnce({
        db: () => ({
          collection: () => ({
            find: jest.fn().mockReturnValueOnce({
              toArray: jest.fn().mockResolvedValueOnce([mockStaff]),
            }),
          }),
        }),
      });

      const response = await request(app).get('/staff');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([mockStaff]);
    });
  });

  describe('GET /staff/:id', () => {
    it('should return a single staff member by ID', async () => {
      mongodb.getDatabase.mockReturnValueOnce({
        db: () => ({
          collection: () => ({
            findOne: jest.fn().mockResolvedValueOnce(mockStaff),
          }),
        }),
      });

      const response = await request(app).get(`/staff/${mockStaffId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockStaff);
    });

    it('should return a 404 status code for non-existent staff ID', async () => {
      const nonExistentStaffId = new ObjectId();
      mongodb.getDatabase.mockReturnValueOnce({
        db: () => ({
          collection: () => ({
            findOne: jest.fn().mockResolvedValueOnce(null),
          }),
        }),
      });

      const response = await request(app).get(`/staff/${nonExistentStaffId}`);
      expect(response.statusCode).toBe(404);
    });
  });

  // Add more tests for createStaff, updateStaff, and deleteStaff endpoints if needed
});
