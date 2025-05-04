/**
 * @openapi
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Унікальний ідентифікатор інгредієнта
 *           example: 1
 *         name:
 *           type: string
 *           description: Назва інгредієнта
 *           example: "Курячий бульйон"
 *         desc:
 *           type: string
 *           description: Опис інгредієнта
 *           example: "Насичений бульйон, зварений з курки та овочів"
 *         img:
 *           type: string
 *           format: uri
 *           description: URL-адреса зображення інгредієнта
 *           example: "https://example.com/images/ingredients/chicken_broth.jpg"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Дата створення запису
 *           example: "2023-01-01T12:00:00Z"
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Дата оновлення запису
 *           example: "2023-01-01T12:00:00Z"
 *
 *     IngredientResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Унікальний ідентифікатор інгредієнта
 *           example: 1
 *         name:
 *           type: string
 *           description: Назва інгредієнта
 *           example: "Курячий бульйон"
 *         desc:
 *           type: string
 *           description: Опис інгредієнта
 *           example: "Насичений бульйон, зварений з курки та овочів"
 *         img:
 *           type: string
 *           format: uri
 *           description: URL-адреса зображення інгредієнта
 *           example: "https://example.com/images/ingredients/chicken_broth.jpg"
 *
 *     IngredientsListResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/IngredientResponse'
 *       example:
 *         - id: 1
 *           name: "Курячий бульйон"
 *           desc: "Насичений бульйон, зварений з курки та овочів"
 *           img: "https://example.com/images/ingredients/chicken_broth.jpg"
 *         - id: 2
 *           name: "Буряк"
 *           desc: "Коренеплід червоного кольору"
 *           img: "https://example.com/images/ingredients/beetroot.jpg"
 */
