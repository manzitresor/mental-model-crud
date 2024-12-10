const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Node.js HTTP Server',
        version: '1.0.0',
        description: 'Simple Node.js HTTP server with GET and POST requests handling',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./index.js'], 
  };

  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  module.exports = {swaggerDocs, swaggerUi}