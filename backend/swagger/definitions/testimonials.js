/**
 * @openapi
 * tags:
 *   name: Testimonials
 *   description: Ендпоінти для роботи з відгуками користувачів
 *
 * /testimonials:
 *   get:
 *     summary: Отримання списку відгуків
 *     description: Отримання відгуків користувачів про платформу
 *     tags: [Testimonials]
 *     responses:
 *       200:
 *         description: Список відгуків
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TestimonialsListResponse'
 */
