import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { APP_DOMAIN = 'http://localhost:3000' } = process.env;

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Recipe App API',
      version: '1.0.0',
      description: 'API documentation for Recipe Application',
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    servers: [
      {
        url: APP_DOMAIN,
        description: 'Server',
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
    './app.js',
  ],
};

const swaggerSpec = swaggerJSDoc(options);

const setup = app => {
  // Маршрут для документації Swagger UI
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Маршрут для отримання Swagger специфікації у форматі JSON
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Swagger documentation available at ${APP_DOMAIN}/api-docs`);
};

export default { setup };
