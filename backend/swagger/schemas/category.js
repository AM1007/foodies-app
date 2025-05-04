/**
 * @openapi
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Унікальний ідентифікатор категорії
 *           example: 1
 *         name:
 *           type: string
 *           description: Назва категорії
 *           example: "Супи"
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
 *     CategoryResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Унікальний ідентифікатор категорії
 *           example: 1
 *         name:
 *           type: string
 *           description: Назва категорії
 *           example: "Супи"
 *
 *     CategoriesListResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/CategoryResponse'
 *       example:
 *         - id: 1
 *           name: "Супи"
 *         - id: 2
 *           name: "Десерти"
 *         - id: 3
 *           name: "Основні страви"
 */
