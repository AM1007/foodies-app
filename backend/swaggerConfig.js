import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import 'dotenv/config';
import chalk from 'chalk'; // Для кольорового виводу в консоль

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Базові URL для обох середовищ
const localUrl = 'http://localhost:3000';
const remoteUrl = 'https://foodies-app-pke3.onrender.com';

// Опції для локальної документації
const localOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Foodies API (Local)',
      version: '1.0.0',
      description: 'API документація для локального розробницького середовища',
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC',
      },
    },
    servers: [
      {
        url: localUrl,
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

// Опції для віддаленої документації
const remoteOptions = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Foodies API (Remote)',
      version: '1.0.0',
      description: 'API документація для віддаленого продакшн середовища',
      license: {
        name: 'ISC',
        url: 'https://opensource.org/licenses/ISC',
      },
    },
    servers: [
      {
        url: remoteUrl,
        description: 'Віддалений сервер',
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

// Генеруємо специфікації для обох середовищ
const localSwaggerSpec = swaggerJSDoc(localOptions);
const remoteSwaggerSpec = swaggerJSDoc(remoteOptions);

const setup = app => {
  // Маршрут для локальної документації Swagger UI
  app.use(
    '/api-docs/local',
    swaggerUi.serve,
    swaggerUi.setup(localSwaggerSpec, {
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true,
      },
    }),
  );

  // Маршрут для віддаленої документації Swagger UI
  app.use(
    '/api-docs/remote',
    swaggerUi.serve,
    swaggerUi.setup(remoteSwaggerSpec, {
      explorer: true,
      swaggerOptions: {
        persistAuthorization: true,
      },
    }),
  );

  // Стандартний маршрут для документації (перенаправляє на локальну)
  app.use('/api-docs', (req, res) => {
    res.redirect('/api-docs/local');
  });

  // Маршрути для отримання специфікацій у форматі JSON
  app.get('/api-docs-local.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(localSwaggerSpec);
  });

  app.get('/api-docs-remote.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(remoteSwaggerSpec);
  });

  // Виведення інформації в консоль при запуску сервера
  console.log('\n' + '='.repeat(70));
  console.log(chalk.green.bold('Swagger документація:'));
  console.log('-'.repeat(70));

  // Локальні посилання
  console.log(chalk.yellow.bold('Локальний сервер:'));
  console.log(
    chalk.blue(`• Локальна API документація: ${localUrl}/api-docs/local`),
  );
  console.log(
    chalk.blue(`• Віддалена API документація: ${localUrl}/api-docs/remote`),
  );
  console.log(
    chalk.blue(
      `• Стандартний шлях (перенаправляє на локальну): ${localUrl}/api-docs`,
    ),
  );

  // Віддалені посилання
  console.log('\n' + chalk.yellow.bold('Віддалений сервер:'));
  console.log(
    chalk.blue(`• Віддалена API документація: ${remoteUrl}/api-docs`),
  );

  console.log('='.repeat(70) + '\n');
};

export default { setup };
