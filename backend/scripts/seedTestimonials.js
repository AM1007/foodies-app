import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectToDatabase } from '../db/sequelize.js';
import sequelize from '../db/sequelize.js';
import Testimonial from '../db/models/Testimonial.js';
import User from '../db/models/User.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function migrateTestimonials() {
  try {
    await connectToDatabase();

    await Testimonial.destroy({ where: {}, force: true });
    await sequelize.query(
      'ALTER SEQUENCE "Testimonials_id_seq" RESTART WITH 1',
    );

    const testimonialsData = fs.readFileSync(
      path.join(__dirname, '..', 'mockData', 'testimonials.json'),
      'utf8',
    );
    const usersData = fs.readFileSync(
      path.join(__dirname, '..', 'mockData', 'users.json'),
      'utf8',
    );

    const testimonialsJson = JSON.parse(testimonialsData);
    const usersJson = JSON.parse(usersData);

    const dbUsers = await User.findAll();
    const emailToId = {};
    dbUsers.forEach(user => {
      emailToId[user.email] = user.id;
    });

    const mongoIdToSqlId = {};
    usersJson.forEach(user => {
      const mongoId = user._id?.$oid;
      const email = user.email;
      if (mongoId && emailToId[email]) {
        mongoIdToSqlId[mongoId] = emailToId[email];
      }
    });

    let insertedCount = 0;

    for (const testimonial of testimonialsJson) {
      const mongoOwnerId = testimonial.owner?.$oid;
      const sqlOwnerId = mongoIdToSqlId[mongoOwnerId];

      if (!sqlOwnerId) {
        console.warn(`No SQL user ID found for Mongo ID: ${mongoOwnerId}`);
        continue;
      }

      await Testimonial.create({
        testimonial: testimonial.testimonial,
        owner: sqlOwnerId,
      });

      console.log(`Inserted testimonial for user ID: ${sqlOwnerId}`);
      insertedCount++;
    }

    console.log(`✅ Successfully inserted ${insertedCount} testimonials.`);
  } catch (error) {
    console.error('❌ Error migrating testimonials:', error.message);
  } finally {
    await sequelize.close();
  }
}

migrateTestimonials()
  .then(() => {
    console.log('Testimonial migration completed.');
    process.exit(0);
  })
  .catch(error => {
    console.error('Testimonial migration failed:', error.message);
    process.exit(1);
  });
