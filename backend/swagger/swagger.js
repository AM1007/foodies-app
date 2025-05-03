// swagger/swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Foodies API',
      version: '1.0.0',
      description: 'API для кулінарної соціальної платформи Foodies',
      contact: {
        name: 'Frontend Lovers',
        url: 'https://github.com/AM1007/foodies_app',
        email: 'contact@example.com',
      },
      license: {
        name: 'ISC License',
        url: 'https://opensource.org/licenses/ISC',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Development server',
      },
      {
        url: 'https://foodies-app-pke3.onrender.com/api',
        description: 'Production server',
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
    tags: [
      {
        name: 'Auth',
        description: 'Ендпоінти для автентифікації та авторизації',
      },
      {
        name: 'Users',
        description: 'Ендпоінти для роботи з користувачами',
      },
      {
        name: 'Recipes',
        description: 'Ендпоінти для роботи з рецептами',
      },
      {
        name: 'Categories',
        description: 'Ендпоінти для роботи з категоріями рецептів',
      },
      {
        name: 'Areas',
        description: 'Ендпоінти для роботи з регіонами кухні',
      },
      {
        name: 'Ingredients',
        description: 'Ендпоінти для роботи з інгредієнтами',
      },
      {
        name: 'Testimonials',
        description: 'Ендпоінти для роботи з відгуками користувачів',
      },
    ],
  },
  // Шляхи до файлів з JSDoc анотаціями
  apis: [
    './routes/*.js',
    './controllers/*.js',
    './db/models/*.js',
    './swagger/schemas/*.js',
    './swagger/definitions/*.js',
  ],
};

// Створення специфікації Swagger
const swaggerSpec = swaggerJSDoc(options);

// Експортуємо функцію, яка повертає специфікацію
export default function () {
  return swaggerSpec;
}
