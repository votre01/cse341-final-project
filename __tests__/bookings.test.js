const request = require('supertest');
const { ObjectId } = require('mongodb');
const app = require('../server');
const mongodb = require('../data/database');

jest.mock('../data/database');

describe('Bookings API', () => {
  // Mocked booking data
  const mockBookingId = new ObjectId();
  const mockBooking = {
    _id: mockBookingId.toHexString(), // Convert ObjectId to string for comparison
    hotelId: 'mockHotelId',
    checkInDate: '2024-06-01',
    checkOutDate: '2024-06-05',
    roomType: 'single',
    roomNumber: '101',
    numOfGuests: 2,
    totalPrice: 500,
    bookingDate: '2024-05-01',
  };

  describe('GET /bookings', () => {
    it('should return all bookings', async () => {
      mongodb.getDatabase.mockReturnValueOnce({
        db: () => ({
          collection: () => ({
            find: jest.fn().mockReturnValueOnce({
              toArray: jest.fn().mockResolvedValueOnce([mockBooking]),
            }),
          }),
        }),
      });

      const response = await request(app).get('/bookings');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual([mockBooking]);
    });
  });

  describe('GET /bookings/:id', () => {
    it('should return a single booking by ID', async () => {
      mongodb.getDatabase.mockReturnValueOnce({
        db: () => ({
          collection: () => ({
            findOne: jest.fn().mockResolvedValueOnce(mockBooking), // Use findOne instead of find
          }),
        }),
      });

      const response = await request(app).get(`/bookings/${mockBookingId}`);
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockBooking);
    });

    it('should return a 404 status code for non-existent booking ID', async () => {
      const nonExistentBookingId = new ObjectId();
      mongodb.getDatabase.mockReturnValueOnce({
        db: () => ({
          collection: () => ({
            findOne: jest.fn().mockResolvedValueOnce(null), // Return null for non-existent booking
          }),
        }),
      });

      const response = await request(app).get(`/bookings/${nonExistentBookingId}`);
      expect(response.statusCode).toBe(404);
    });
  });
});
