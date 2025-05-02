import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'js-yaml';
import SwaggerParser from '@apidevtools/swagger-parser';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const setup = async app => {
  try {
    // Шлях до файлу документації
    const openapiPath = join(__dirname, 'docs', 'openapi.yaml');
    console.log(`Loading Swagger document from: ${openapiPath}`);

    // Об'єднання всіх $ref посилань в один документ
    const bundledDoc = await SwaggerParser.bundle(openapiPath);
    console.log('OpenAPI file bundled successfully');

    if (bundledDoc.paths) {
      console.log(`Found ${Object.keys(bundledDoc.paths).length} API paths`);
    }

    // Налаштування Swagger UI
    app.use('/api-docs', swaggerUi.serve);
    app.get(
      '/api-docs',
      swaggerUi.setup(bundledDoc, {
        explorer: true,
        swaggerOptions: {
          docExpansion: 'list',
          filter: true,
          persistAuthorization: true,
        },
      }),
    );

    console.log(
      `Swagger documentation available at http://localhost:3000/api-docs`,
    );
  } catch (error) {
    console.error('Failed to load Swagger document:', error);
  }
};

export default { setup };
