import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Додаємо логіку повторних спроб
const MAX_RETRIES = 5;
const RETRY_INTERVAL = 5000; // 5 секунд

// Визначаємо об'єкт Sequelize з використанням URL підключення
// У продакшені вимагаємо DATABASE_URL, а для розробки можемо використовувати локальне підключення
const sequelize = new Sequelize(
  process.env.DATABASE_URL ||
    (process.env.NODE_ENV === 'production'
      ? null // В продакшені суворо вимагаємо DATABASE_URL
      : 'postgresql://localhost:5432/foodies_dev'), // Локальна розробка
  {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: process.env.NODE_ENV === 'production', // SSL лише для продакшену
        rejectUnauthorized: false,
      },
    },
    logging: process.env.NODE_ENV === 'production' ? false : console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

async function connectToDatabase(retryCount = 0) {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
    return true;
  } catch (error) {
    // Розширений лог помилок для кращої діагностики
    console.error('Database connection error details:', {
      message: error.message,
      code: error.original?.code,
      parent: error.parent?.message,
    });

    if (retryCount < MAX_RETRIES) {
      console.log(
        `Retrying connection in ${RETRY_INTERVAL / 1000}s... (${
          retryCount + 1
        }/${MAX_RETRIES})`,
      );
      await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
      return connectToDatabase(retryCount + 1);
    } else {
      console.error('Max retries reached. Could not connect to database.');
      // Не завершуємо процес, дозволяємо серверу запуститися для API endpoints, які не потребують DB
      return false;
    }
  }
}

export { connectToDatabase };
export default sequelize;

// =============================================
// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// const MAX_RETRIES = 5;
// const RETRY_INTERVAL = 5000;

// const sequelize = new Sequelize(
//   process.env.DATABASE_URL ||
//     'postgresql://foodies_app_aymc_user:mjGUJvDHWZqmXQlqPeMEaH5VT7o7bY5J@dpg-d0788k49c44c739pa7b0-a/foodies_app_aymc',
//   {
//     dialect: 'postgres',
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//     },
//     logging: process.env.NODE_ENV === 'production' ? false : console.log,
//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },
//   },
// );

// async function connectToDatabase(retryCount = 0) {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connection successful');
//     return true;
//   } catch (error) {
//     console.error('Database connection error details:', {
//       message: error.message,
//       code: error.original?.code,
//       parent: error.parent?.message,
//     });

//     if (retryCount < MAX_RETRIES) {
//       console.log(
//         `Retrying connection in ${RETRY_INTERVAL / 1000}s... (${
//           retryCount + 1
//         }/${MAX_RETRIES})`,
//       );
//       await new Promise(resolve => setTimeout(resolve, RETRY_INTERVAL));
//       return connectToDatabase(retryCount + 1);
//     } else {
//       console.error('Max retries reached. Could not connect to database.');
//       return false;
//     }
//   }
// }

// export { connectToDatabase };
// export default sequelize;
