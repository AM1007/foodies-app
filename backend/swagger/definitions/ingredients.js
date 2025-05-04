/**
 * @openapi
 * tags:
 *   name: Ingredients
 *   description: Ендпоінти для роботи з інгредієнтами
 *
 * /ingredients:
 *   get:
 *     summary: Отримання списку інгредієнтів
 *     description: Отримання всіх доступних інгредієнтів для приготування страв
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: Список інгредієнтів
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IngredientsListResponse'
 */
