import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let sequelize;

try {
  if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect: 'postgres',
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    });
  } else if (
    process.env.DATABASE_HOST &&
    process.env.DATABASE_NAME &&
    process.env.DATABASE_USERNAME
  ) {
    sequelize = new Sequelize({
      dialect: process.env.DATABASE_DIALECT || 'postgres',
      host: process.env.DATABASE_HOST,
      port: process.env.DATABASE_PORT || 5432,
      database: process.env.DATABASE_NAME,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      logging: false,
    });
  } else {
    throw new Error(
      'Database connection parameters not provided. Please set DATABASE_URL or individual database parameters.',
    );
  }
} catch (error) {
  throw error;
}

async function connectToDatabase() {
  try {
    await sequelize.authenticate();

    try {
      await sequelize.query('SELECT 1+1 AS result');
    } catch (queryError) {
      // Тест запиту не вдався, але ми продовжуємо
    }
  } catch (error) {
    if (process.env.NODE_ENV !== 'production') {
      throw error;
    }
  }
}

export { connectToDatabase };
export default sequelize;
