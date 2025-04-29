import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';

import { connectToDatabase } from './db/sequelize.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import swaggerConfig from './swaggerConfig.js';

// Імпорт маршрутів (будуть додані пізніше)
// import authRouter from './routes/authRouter.js';
// import usersRouter from './routes/usersRouter.js';
// import recipesRouter from './routes/recipesRouter.js';
import categoriesRouter from './routes/categoriesRouter.js';
import areasRouter from './routes/areasRouter.js';
import ingredientsRouter from './routes/ingredientsRouter.js';
import testimonialRouter from './routes/testimonialRouter.js';

const app = express();

// Логування запитів
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(morgan(formatsLogger));

// Налаштування CORS
app.use(cors());

// Парсери для обробки JSON та URL-encoded даних
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Статичні файли
app.use(express.static('public'));

// Налаштування Swagger документації
swaggerConfig.setup(app);

// Підключення до бази даних
connectToDatabase();

// Підключення моделей та асоціацій
import './db/associations.js';

// Базовий маршрут для перевірки роботи API
app.get('/', (req, res) => {
  res.send('Foodies API is running!');
});

// Підключення маршрутів
// app.use('/api/auth', authRouter);
// app.use('/api/users', usersRouter);
// app.use('/api/recipes', recipesRouter);
// app.use('/api/categories', categoriesRouter);
// app.use('/api/areas', areasRouter);
// app.use('/api/ingredients', ingredientsRouter);
// app.use('/api/testimonials', testimonialRouter);

// Обробка неіснуючих маршрутів
app.use(notFoundHandler);

// Обробка помилок
app.use(errorHandler);

const { PORT = 3000 } = process.env;
const port = Number(PORT);

app.listen(port, () => {
  console.log(`Server is running. App is listening on port ${port}`);
  console.log(
    `API Documentation available at http://localhost:${port}/api-docs`,
  );
});
