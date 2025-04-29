import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Area from '../db/models/Area.js';
import { connectToDatabase } from '../db/sequelize.js';
import sequelize from '../db/sequelize.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Мапінг для збереження відповідності між MongoDB ID і SQL ID
const areaIdMap = {};

async function migrateAreas() {
  try {
    // Підключення до бази даних
    await connectToDatabase();

    // Очищення таблиці й скидання автоінкременту
    await Area.destroy({ where: {}, force: true });

    // Скидання послідовності (для PostgreSQL)
    await sequelize.query('ALTER SEQUENCE "Areas_id_seq" RESTART WITH 1');

    // Зчитування файлу areas.json
    const areasData = fs.readFileSync(
      path.join(__dirname, '..', 'mockData', 'areas.json'),
      'utf8',
    );
    const areasJson = JSON.parse(areasData);

    // Підготовка даних для вставки
    const areasToInsert = areasJson.map(area => ({
      name: area.name,
    }));

    // Вставка даних і отримання результатів
    const createdAreas = await Area.bulkCreate(areasToInsert, {
      returning: true,
    });

    // Створення мапінгу MongoDB ID -> SQL ID
    createdAreas.forEach((createdArea, index) => {
      const mongoId = areasJson[index]._id.$oid;
      areaIdMap[mongoId] = createdArea.id;
      console.log(`Area mapped: ${mongoId} -> ${createdArea.id}`);
    });

    console.log('Areas migration completed successfully!');
    console.log('Area ID mapping:', areaIdMap);

    return areaIdMap;
  } catch (error) {
    console.error('Error during areas migration:', error);
    throw error;
  }
}

// Викликаємо функцію міграції
migrateAreas()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Migration failed:', error);
    process.exit(1);
  });
