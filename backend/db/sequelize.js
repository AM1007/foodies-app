import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Визначте змінну для URL бази даних
const databaseUrl = process.env.DATABASE_URL || null;

// Створіть об'єкт конфігурації на основі наявності DATABASE_URL
const sequelizeConfig = databaseUrl
  ? {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: process.env.NODE_ENV === 'production' ? false : console.log,
    }
  : {
      dialect: process.env.DATABASE_DIALECT || 'postgres',
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
      logging: process.env.NODE_ENV === 'production' ? false : console.log,
    };

// Створіть екземпляр Sequelize з відповідною конфігурацією
const sequelize = databaseUrl
  ? new Sequelize(databaseUrl, sequelizeConfig)
  : new Sequelize(sequelizeConfig);

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection error:', error);
    // Не завершуємо процес у production-середовищі, даємо можливість повторних спроб
    if (process.env.NODE_ENV !== 'production') {
      process.exit(1);
    }
  }
}

export { connectToDatabase };
export default sequelize;

// ================================================================
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
