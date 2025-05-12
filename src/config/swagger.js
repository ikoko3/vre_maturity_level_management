"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swagger_autogen_1 = require("swagger-autogen");
var doc = {
    info: {
        title: 'My API',
        description: 'API documentation with swagger-autogen',
        version: '1.0.0',
    },
    host: 'localhost:3000',
    schemes: ['http'],
    tags: [
        {
            name: 'Users',
            description: 'User-related endpoints',
        },
    ],
};
var outputFile = './src/docs/swagger-output.json';
var endpointsFiles = ['./src/index.ts']; // main file that initializes routes
(0, swagger_autogen_1.default)({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);
