/**
 * @openapi
 * components:
 *   schemas:
 *     Testimonial:
 *       type: object
 *       required:
 *         - testimonial
 *         - owner
 *       properties:
 *         id:
 *           type: integer
 *           description: Унікальний ідентифікатор відгуку
 *           example: 1
 *         testimonial:
 *           type: string
 *           description: Текст відгуку
 *           example: "Foodies — найкращий сайт рецептів, який я знайшла! Чудовий інтерфейс і різноманіття рецептів на будь-який смак."
 *         owner:
 *           type: integer
 *           description: Ідентифікатор користувача, який написав відгук
 *           example: 42
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
 *     TestimonialResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Унікальний ідентифікатор відгуку
 *           example: 1
 *         testimonial:
 *           type: string
 *           description: Текст відгуку
 *           example: "Foodies — найкращий сайт рецептів, який я знайшла! Чудовий інтерфейс і різноманіття рецептів на будь-який смак."
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 42
 *             name:
 *               type: string
 *               example: "Марія Іваненко"
 *             email:
 *               type: string
 *               format: email
 *               example: "maria@example.com"
 *             avatar:
 *               type: string
 *               format: uri
 *               example: "https://example.com/avatars/maria.jpg"
 *
 *     TestimonialsListResponse:
 *       type: array
 *       items:
 *         $ref: '#/components/schemas/TestimonialResponse'
 *       example:
 *         - id: 1
 *           testimonial: "Foodies — найкращий сайт рецептів, який я знайшла! Чудовий інтерфейс і різноманіття рецептів на будь-який смак."
 *           user:
 *             id: 42
 *             name: "Марія Іваненко"
 *             email: "maria@example.com"
 *             avatar: "https://example.com/avatars/maria.jpg"
 */
