const request = require('supertest');
const { ObjectId } = require('mongodb');
const app = require('../server'); // Assuming the server file exports the Express app
const mongodb = require('../data/database');

jest.mock('../data/database');

describe('Hotels API', () => {
  // Mocked hotel data
  const mockHotelId = new ObjectId();
  const mockHotel = {
    _id: mockHotelId.toHexString(),
    name: 'Mock Hotel',
    location: 'Mock Location',
    rating: 4.5,
    roomsAvailable: 10,
    amenities: ['Wi-Fi', 'Pool'],
    pricePerNight: 150,
    contactEmail: 'hotel@example.com',
  };

  describe('GET /hotels', () => {
    it('should return all hotels', async () => {
      mongodb.getDatabase.mockReturnValueOnce({
        db: () => ({
          collection: () => ({
            find: jest.fn().mockReturnValueOnce({
              toArray: jest.fn().mockResolvedValueOnce([mockHotel]),
            }),
          }),
        }),
      });

      const response = await request(app).get('/hotels');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([mockHotel]);
    });
  });

  describe('GET /hotels/:id', () => {
    it('should return a single hotel by ID', async () => {
      mongodb.getDatabase.mockReturnValueOnce({
        db: () => ({
          collection: () => ({
            findOne: jest.fn().mockResolvedValueOnce(mockHotel),
          }),
        }),
      });

      const response = await request(app).get(`/hotels/${mockHotelId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockHotel);
    });

    it('should return a 404 status code for non-existent hotel ID', async () => {
      const nonExistentHotelId = new ObjectId();
      mongodb.getDatabase.mockReturnValueOnce({
        db: () => ({
          collection: () => ({
            findOne: jest.fn().mockResolvedValueOnce(null),
          }),
        }),
      });

      const response = await request(app).get(`/hotels/${nonExistentHotelId}`);
      expect(response.statusCode).toBe(404);
    });
  });

  // Add more tests for createHotel, updateHotel, and deleteHotel endpoints if needed
});
