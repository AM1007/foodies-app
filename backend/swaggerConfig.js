import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Визначаємо домен додатку з налаштувань або використовуємо localhost за замовчуванням
const { APP_DOMAIN = 'http://localhost:3000' } = process.env;

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Foodies API',
      version: '1.0.0',
      description: 'API документація для кулінарного застосунку Foodies',
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC',
      },
    },
    servers: [
      {
        url: APP_DOMAIN,
        description: 'Поточний сервер',
      },
      {
        url: 'https://foodies-app-pke3.onrender.com',
        description: 'Віддалений сервер',
      },
      {
        url: 'http://localhost:3000',
        description: 'Локальний сервер розробки',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: [
    './routes/*.js',
    './schemas/*.js',
    './swagger/paths/*.yaml',
    './swagger/components/**/*.yaml',
    './docs/paths/**/*.yaml',
    './docs/components/**/*.yaml',
    './app.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const setup = app => {
  // Маршрут для документації Swagger UI
  app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, {
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true,
      },
    }),
  );

  // Маршрут для отримання Swagger специфікації у форматі JSON
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(
    `Swagger документація доступна за адресою ${APP_DOMAIN}/api-docs`,
  );
  console.log(
    `Віддалена Swagger документація доступна за адресою https://foodies-app-pke3.onrender.com/api-docs`,
  );
};

export default { setup };
