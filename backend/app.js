import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import chalk from 'chalk';
import 'dotenv/config';
import swaggerUi from 'swagger-ui-express';

import { connectToDatabase } from './db/sequelize.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import './db/associations.js';
import swaggerConfig from './swagger/index.js';

import authRouter from './routes/authRouter.js';
import usersRouter from './routes/usersRouter.js';
import recipesRouter from './routes/recipesRouter.js';
import categoriesRouter from './routes/categoriesRouter.js';
import areasRouter from './routes/areasRouter.js';
import ingredientsRouter from './routes/ingredientsRouter.js';
import testimonialRouter from './routes/testimonialRouter.js';

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(morgan(formatsLogger));

const corsOptions = {
  origin: [
    'https://foodies-app-pke3.onrender.com',
    'http://localhost:3000',
    'https://foodies-app-ten-iota.vercel.app',
    'http://localhost:5173',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

let databaseConnected = false;
try {
  await connectToDatabase();
  databaseConnected = true;
} catch (error) {
  console.error('Failed to connect to database:', error);
  console.warn('Starting server without database connection...');
}

app.get('/api/status', (req, res) => {
  res.json({
    server: 'running',
    database: databaseConnected ? 'connected' : 'disconnected',
    environment: process.env.NODE_ENV,
    version: '1.0.0',
  });
});

const swaggerSpec = swaggerConfig();
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Foodies API is running!');
});

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/areas', areasRouter);
app.use('/api/ingredients', ingredientsRouter);
app.use('/api/testimonials', testimonialRouter);

app.use(notFoundHandler);

app.use(errorHandler);

const { PORT = 3000 } = process.env;
const port = Number(PORT);

app.listen(port, () => {
  console.log(
    chalk.green.bold(
      `🚀 Server is running. App is listening on port ${chalk.yellow(port)}`,
    ),
  );
  console.log(
    chalk.cyan(
      `📚 API Documentation available at ${chalk.underline(
        `http://localhost:${port}/api-docs`,
      )}`,
    ),
  );

  console.log(
    databaseConnected
      ? chalk.green('✅ Database connection: established')
      : chalk.red('❌ Database connection: failed'),
  );
});
