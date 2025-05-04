import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Створюємо URL для підключення до бази даних
const DATABASE_URL =
  process.env.DATABASE_URL ||
  `postgresql://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_NAME}`;

// Виводимо інформацію для діагностики (замаскувавши пароль для безпеки)
console.log('Database connection info:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_DIALECT:', process.env.DATABASE_DIALECT);
console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
console.log('DATABASE_PORT:', process.env.DATABASE_PORT);
console.log('DATABASE_NAME:', process.env.DATABASE_NAME);
console.log('DATABASE_USERNAME:', process.env.DATABASE_USERNAME);
// Не виводимо пароль у відкритому вигляді
console.log('DATABASE_PASSWORD: [REDACTED]');

// Перевіряємо, чи є URL бази даних
console.log(
  'Using DATABASE_URL:',
  process.env.DATABASE_URL
    ? 'Yes (from env)'
    : 'No (constructed from separate params)',
);

// Налаштування Sequelize
const sequelizeConfig = {
  dialect: process.env.DATABASE_DIALECT || 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false, // Вимикаємо логування SQL для зменшення шуму
};

console.log(
  'Sequelize config:',
  JSON.stringify({
    ...sequelizeConfig,
    // Не включаємо ssl в вивід для безпеки
    dialectOptions: {
      ssl: sequelizeConfig.dialectOptions.ssl
        ? '[SSL ENABLED]'
        : '[SSL DISABLED]',
    },
  }),
);

// Спроба створити екземпляр Sequelize
console.log('Creating Sequelize instance...');
let sequelize;
try {
  sequelize = new Sequelize(DATABASE_URL, sequelizeConfig);
  console.log('Sequelize instance created successfully');
} catch (error) {
  console.error('Error creating Sequelize instance:', error.message);
  throw error;
}

async function connectToDatabase() {
  console.log('Attempting to authenticate database connection...');
  try {
    await sequelize.authenticate();
    console.log('✅ Database authentication successful');

    // Додаткова перевірка - спробуємо виконати простий запит
    try {
      const result = await sequelize.query('SELECT 1+1 AS result');
      console.log('✅ Test query successful, result:', result[0][0]);
    } catch (queryError) {
      console.error('❌ Test query failed:', queryError.message);
    }
  } catch (error) {
    console.error('❌ Database authentication failed:', error.message);
    if (error.original) {
      console.error('Original error:', error.original.message);

      // Додаткова інформація про помилку ECONNREFUSED
      if (error.original.code === 'ECONNREFUSED') {
        console.error('Connection refused. This could be due to:');
        console.error('1. Database server is not running');
        console.error('2. Database host/port is incorrect');
        console.error('3. Network restrictions (firewall rules)');
        console.error('4. Database credentials are incorrect');
      }
    }

    // Тільки виходимо з процесу у не-production середовищі
    if (process.env.NODE_ENV !== 'production') {
      throw error;
    }
  }
}

export { connectToDatabase };
export default sequelize;

// =========================================================
// import { Sequelize } from 'sequelize';
// import dotenv from 'dotenv';

// dotenv.config();

// // Визначте змінну для URL бази даних
// const databaseUrl = process.env.DATABASE_URL || null;

// // Створіть об'єкт конфігурації на основі наявності DATABASE_URL
// const sequelizeConfig = databaseUrl
//   ? {
//       dialect: 'postgres',
//       dialectOptions: {
//         ssl: {
//           require: true,
//           rejectUnauthorized: false,
//         },
//       },
//       logging: process.env.NODE_ENV === 'production' ? false : console.log,
//     }
//   : {
//       dialect: process.env.DATABASE_DIALECT || 'postgres',
//       username: process.env.DATABASE_USERNAME,
//       password: process.env.DATABASE_PASSWORD,
//       host: process.env.DATABASE_HOST,
//       database: process.env.DATABASE_NAME,
//       port: process.env.DATABASE_PORT,
//       dialectOptions: {
//         ssl: {
//           require: true,
//           rejectUnauthorized: false,
//         },
//       },
//       logging: process.env.NODE_ENV === 'production' ? false : console.log,
//     };

// // Створіть екземпляр Sequelize з відповідною конфігурацією
// const sequelize = databaseUrl
//   ? new Sequelize(databaseUrl, sequelizeConfig)
//   : new Sequelize(sequelizeConfig);

// async function connectToDatabase() {
//   try {
//     await sequelize.authenticate();
//     console.log('Database connection successful');
//   } catch (error) {
//     console.error('Database connection error:', error);
//     // Не завершуємо процес у production-середовищі, даємо можливість повторних спроб
//     if (process.env.NODE_ENV !== 'production') {
//       process.exit(1);
//     }
//   }
// }

// export { connectToDatabase };
// export default sequelize;

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
