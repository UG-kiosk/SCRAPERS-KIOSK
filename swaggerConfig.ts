import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Kiosk Scrapers',
            version: '1.0.0',
            description: 'This is the API documentation for the Kiosk Scrapers.',
        },
        servers: [
            {
                url: 'http://localhost:3001',
            },
        ],
    },
    apis: ['src/routes/*.ts'],
};

const specs = swaggerJsdoc(swaggerOptions);

export default specs;