// app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';

import { connectToDatabase } from './db/sequelize.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import './db/associations.js';
import swaggerDocs from './swagger/swagger.js';

// Імпорт маршрутів
import authRouter from './routes/authRouter.js';
import usersRouter from './routes/usersRouter.js';
import recipesRouter from './routes/recipesRouter.js';
import categoriesRouter from './routes/categoriesRouter.js';
import areasRouter from './routes/areasRouter.js';
import ingredientsRouter from './routes/ingredientsRouter.js';
import testimonialRouter from './routes/testimonialRouter.js';

const app = express();

// Логування запитів
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(morgan(formatsLogger));

// Налаштування CORS
const allowedOrigins = ['https://foodies-app-pke3.onrender.com', 'http://localhost:3000', 'http://localhost:5173'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.error(`CORS заблоковано запит з: ${origin}`);
      callback(new Error('Не дозволено CORS політикою'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With','Access-Control-Allow-Headers',],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  maxAge: 86400 // 24 години
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Парсери для обробки JSON та URL-encoded даних
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статичні файли
app.use(express.static('public'));

// Підключення до бази даних
connectToDatabase();

// Базовий маршрут для перевірки роботи API
app.get('/', (req, res) => {
  res.send('Foodies API is running!');
});

// Підключення Swagger UI
const swaggerSpec = swaggerDocs();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Підключення маршрутів
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/areas', areasRouter);
app.use('/api/ingredients', ingredientsRouter);
app.use('/api/testimonials', testimonialRouter);

// Обробка неіснуючих маршрутів
app.use(notFoundHandler);

// Обробка помилок
app.use(errorHandler);

const { PORT = 3000 } = process.env;
const port = Number(PORT);

app.listen(port, () => {
  console.log(`Server is running. App is listening on port ${port}`);
  console.log(
    `Swagger документація доступна за адресою http://localhost:${port}/api-docs`,
  );
});
