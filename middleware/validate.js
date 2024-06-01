const validator = require('../helpers/validate');

const saveBooking = (req, res, next) => {
  const validationRule = {
    hotelId: 'required|string',
    checkInDate: 'required|string',
    checkOutDate: 'required|string',
    roomType: 'required|string',
    roomNumber: 'required|string',
    numOfGuests: 'required|integer',
    totalPrice: 'required|integer',
    bookingDate: 'string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveClient = (req, res, next) => {
  const validationRule = {
    username: 'required|string',
    firstName: 'required|string',
    lastName: 'required|string',
    address: 'required|string',
    birthdate: 'required|string',
    email: 'required|email',
    membershipStatus: 'required|string',
    membershipTier: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveHotel = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    location: 'required|string',
    rating: 'required|integer',
    roomsAvailable: 'required|integer',
    amenities: 'required|array',
    pricePerNight: 'required|integer',
    contactEmail: 'required|email'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveStaff = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    position: 'required|string',
    department: 'required|string',
    email: 'required|email',
    phone: 'required|string',
    hireDate: 'required|string',
    salary: 'required|integer'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveBooking,
  saveClient,
  saveHotel,
  saveStaff
};
