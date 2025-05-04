/**
 * @openapi
 * tags:
 *   name: Categories
 *   description: Ендпоінти для роботи з категоріями рецептів
 *
 * /categories:
 *   get:
 *     summary: Отримання списку категорій рецептів
 *     description: Отримання всіх доступних категорій рецептів (наприклад, супи, десерти, основні страви)
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Список категорій рецептів
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/CategoriesListResponse'
 */
