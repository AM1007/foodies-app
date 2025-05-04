import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let sequelize;

if (
  process.env.NODE_ENV === 'production' &&
  process.env.INTERNAL_DATABASE_URL
) {
  sequelize = new Sequelize(process.env.INTERNAL_DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: console.log,
  });
  console.log('Using internal database URL for production');
} else {
  sequelize = new Sequelize({
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
    logging: console.log,
  });
  console.log('Using standard database parameters');
}

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}

export { connectToDatabase };
export default sequelize;

// temporary commit
// ===========================================

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
