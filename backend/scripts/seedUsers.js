import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import User from '../db/models/User.js';
import { connectToDatabase } from '../db/sequelize.js';
import sequelize from '../db/sequelize.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Мапінг для збереження відповідності між MongoDB ID і SQL ID
const userIdMap = {};

async function migrateUsers() {
  try {
    // Підключення до бази даних
    await connectToDatabase();

    // Очищення таблиці й скидання автоінкременту
    await User.destroy({ where: {}, force: true });

    // Скидання послідовності (для PostgreSQL)
    await sequelize.query('ALTER SEQUENCE "Users_id_seq" RESTART WITH 1');

    // Зчитування файлу users.json
    const usersData = fs.readFileSync(
      path.join(__dirname, '..', 'mockData', 'users.json'),
      'utf8',
    );
    const usersJson = JSON.parse(usersData);

    // Хешування пароля за замовчуванням
    const defaultPassword = 'password123'; // Можна змінити на більш безпечний
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(defaultPassword, salt);

    // Підготовка даних для вставки
    const usersToInsert = usersJson.map(user => ({
      name: user.name,
      email: user.email,
      password: hashedPassword,
      avatar: user.avatar,
      // Не включаємо followers і following, бо вони будуть в окремій таблиці
    }));

    // Очищення таблиці перед вставкою (опціонально)
    await User.destroy({ where: {}, force: true });

    // Вставка даних і отримання результатів
    const createdUsers = await User.bulkCreate(usersToInsert, {
      returning: true,
    });

    // Створення мапінгу MongoDB ID -> SQL ID
    createdUsers.forEach((createdUser, index) => {
      const mongoId = usersJson[index]._id.$oid;
      userIdMap[mongoId] = createdUser.id;
      console.log(`User mapped: ${mongoId} -> ${createdUser.id}`);
    });

    console.log('Users migration completed successfully!');
    console.log('User ID mapping:', userIdMap);

    return userIdMap;
  } catch (error) {
    console.error('Error during users migration:', error);
    throw error;
  }
}

// Викликаємо функцію міграції
migrateUsers()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
