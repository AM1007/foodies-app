/**
 * @openapi
 * tags:
 *   name: Areas
 *   description: Ендпоінти для роботи з регіонами кухні
 *
 * /areas:
 *   get:
 *     summary: Отримання списку регіонів кухні
 *     description: Отримання всіх доступних регіонів кухні (наприклад, українська, італійська, французька)
 *     tags: [Areas]
 *     responses:
 *       200:
 *         description: Список регіонів кухні
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AreasListResponse'
 */
