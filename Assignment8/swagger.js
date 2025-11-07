const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Management API',
            version: '1.0.0',
            description: 'A secure RESTful API for managing users and profile images with Node.js, Express, and MongoDB',
            contact: {
                name: 'API Support',
                email: 'support@example.com'
            },
            license: {
                name: 'ISC',
                url: 'https://opensource.org/licenses/ISC'
            }
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        components: {
            schemas: {
                User: {
                    type: 'object',
                    required: ['fullName', 'email', 'password'],
                    properties: {
                        fullName: {
                            type: 'string',
                            description: 'Full name (alphabetic characters and spaces only)',
                            example: 'John Doe',
                            pattern: '^[A-Za-z\\s]{2,}$'
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Valid email address (unique)',
                            example: 'john@example.com'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            description: 'Strong password (min 8 chars, uppercase, lowercase, digit, special char)',
                            example: 'Pass@123',
                            minLength: 8
                        }
                    }
                },
                UserUpdate: {
                    type: 'object',
                    required: ['email'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email of the user to update',
                            example: 'john@example.com'
                        },
                        fullName: {
                            type: 'string',
                            description: 'New full name',
                            example: 'Jane Doe'
                        },
                        password: {
                            type: 'string',
                            format: 'password',
                            description: 'New password',
                            example: 'NewPass@456'
                        }
                    }
                },
                UserDelete: {
                    type: 'object',
                    required: ['email'],
                    properties: {
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'Email of the user to delete',
                            example: 'john@example.com'
                        }
                    }
                },
                UserResponse: {
                    type: 'object',
                    properties: {
                        fullName: {
                            type: 'string',
                            example: 'John Doe'
                        },
                        email: {
                            type: 'string',
                            example: 'john@example.com'
                        },
                        password: {
                            type: 'string',
                            description: 'Hashed password',
                            example: '$2b$10$abcdefghijklmnopqrstuvwxyz'
                        }
                    }
                },
                SuccessMessage: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'User created successfully.'
                        }
                    }
                },
                ImageUploadResponse: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            example: 'Image uploaded successfully.'
                        },
                        filePath: {
                            type: 'string',
                            example: '/images/john_1762125936640_photo.jpg'
                        }
                    }
                },
                Error: {
                    type: 'object',
                    properties: {
                        error: {
                            type: 'string',
                            example: 'Validation failed.'
                        },
                        details: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            example: ['Invalid email format']
                        }
                    }
                }
            }
        },
        tags: [
            {
                name: 'Users',
                description: 'User management endpoints'
            },
            {
                name: 'Images',
                description: 'Image upload endpoints'
            }
        ]
    },
    apis: ['./routes/*.js']
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };