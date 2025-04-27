import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'dotenv/config';

import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();

// Логування запитів
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(morgan(formatsLogger));

// Налаштування CORS
app.use(cors());

// Парсери для обробки JSON та URL-encoded даних
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Обробка неіснуючих маршрутів
app.use(notFoundHandler);

// Обробка помилок
app.use(errorHandler);

const { PORT = 3000 } = process.env;
const port = Number(PORT);

app.listen(port, () => {
  console.log(`Server is running. App is listening on port ${port}`);
});
