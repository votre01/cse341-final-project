const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'HotelierPro API',
    description: 'This is an API for HotelierPro application, providing endpoints for managing hotels, staff, clients, and bookings.',
    version: '1.0.0'
  },
  host: 'cse341-final-project-phmu.onrender.com', 
  schemes: ['https'], 
  securityDefinitions: {
    githubOAuth: {
      type: 'oauth2',
      flow: 'accessCode',
      authorizationUrl: 'https://github.com/login/oauth/authorize',
      tokenUrl: 'https://github.com/login/oauth/access_token',
      scopes: {
        read: 'Grants read access',
        write: 'Grants write access'
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate Swagger documentation based on endpoint files and configuration
swaggerAutogen(outputFile, endpointsFiles, doc);
