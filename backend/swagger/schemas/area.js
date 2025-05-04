/**
 * @openapi
 * components:
 *   schemas:
 *     Area:
 *       type: object
 *       required:
 *         - name
 *       properties:
 *         id:
 *           type: integer
 *           description: Унікальний ідентифікатор регіону кухні
 *           example: 1
 *         name:
 *           type: string
 *           description: Назва регіону кухні
 *           example: "Українська"
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
 *     AreaResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Унікальний ідентифікатор регіону кухні
 *           example: 1
 *         name:
 *           type: string
 *           description: Назва регіону кухні
 *           example: "Українська"
 *
 *     AreasListResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/AreaResponse'
 *       example:
 *         - id: 1
 *           name: "Українська"
 *         - id: 2
 *           name: "Італійська"
 *         - id: 3
 *           name: "Французька"
 */
