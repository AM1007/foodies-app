import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const setup = app => {
  try {
    // Завантаження OpenAPI специфікації з YAML файлу
    const openapiPath = join(__dirname, 'docs', 'openapi.yaml');
    const openapiContent = fs.readFileSync(openapiPath, 'utf8');
    const openapiSpec = yaml.load(openapiContent);

    app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(openapiSpec, {
        explorer: true,
        swaggerOptions: {
          validatorUrl: null,
          docExpansion: 'list',
          filter: true,
        },
      }),
    );

    console.log(
      'Swagger документація доступна за адресою: http://localhost:3000/api-docs',
    );
  } catch (error) {
    console.error('Помилка налаштування Swagger:', error);
  }
};

export default { setup };
