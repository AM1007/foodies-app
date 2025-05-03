// swagger/schemas/components.js
/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Повідомлення про помилку
 *       example:
 *         message: "Помилка запиту"
 *
 *     Pagination:
 *       type: object
 *       properties:
 *         totalItems:
 *           type: integer
 *           description: Загальна кількість записів
 *         totalPages:
 *           type: integer
 *           description: Загальна кількість сторінок
 *         currentPage:
 *           type: integer
 *           description: Поточна сторінка
 *         perPage:
 *           type: integer
 *           description: Кількість записів на сторінці
 *         nextPage:
 *           type: integer
 *           nullable: true
 *           description: Наступна сторінка (null, якщо остання)
 *         prevPage:
 *           type: integer
 *           nullable: true
 *           description: Попередня сторінка (null, якщо перша)
 *       example:
 *         totalItems: 150
 *         totalPages: 15
 *         currentPage: 2
 *         perPage: 10
 *         nextPage: 3
 *         prevPage: 1
 *
 *     PaginatedResponse:
 *       type: object
 *       properties:
 *         data:
 *           type: array
 *           items:
 *             type: object
 *         pagination:
 *           $ref: '#/components/schemas/Pagination'
 */
