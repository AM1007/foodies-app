import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Явно виводимо значення для діагностики
console.log(`Database dialect: ${process.env.DATABASE_DIALECT}`);
console.log(`Database host: ${process.env.DATABASE_HOST}`);

const sequelize = new Sequelize({
  dialect: 'postgres', // Явно вказуємо діалект замість використання змінної оточення
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: console.log, // Використовуємо console.log замість true для уникнення попереджень
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection error:', error);
    console.error('Database connection details:', {
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      database: process.env.DATABASE_NAME,
      port: process.env.DATABASE_PORT,
    });
    // Альтернативно можна не завершувати процес, а просто логувати помилку
    // process.exit(1);
    console.warn('Application will continue without database connection');
  }
}

export { connectToDatabase };
export default sequelize;

// ======================================================================
// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// const sequelize = new Sequelize({
//   dialect: process.env.DATABASE_DIALECT || 'postgres',
//   username: process.env.DATABASE_USERNAME,
//   password: process.env.DATABASE_PASSWORD,
//   host: process.env.DATABASE_HOST,
//   database: process.env.DATABASE_NAME,
//   port: process.env.DATABASE_PORT,
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false,
//     },
//   },
//   logging: true,
// });

// async function connectToDatabase() {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connection successful');
//   } catch (error) {
//     console.error('Database connection error:', error);
//     process.exit(1);
//   }
// }

// export { connectToDatabase };
// export default sequelize;
