/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Ендпоінти для роботи з користувачами
 *
 * /users:
 *   get:
 *     summary: Отримання списку всіх користувачів
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Список користувачів
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserListResponse'
 *       401:
 *         description: Необхідна автентифікація
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /users/current:
 *   get:
 *     summary: Отримання інформації про поточного користувача
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Інформація про поточного користувача
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/UserResponse'
 *       401:
 *         description: Необхідна автентифікація
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /users/{id}:
 *   get:
 *     summary: Отримання детальної інформації про користувача
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ідентифікатор користувача
 *     responses:
 *       200:
 *         description: Детальна інформація про користувача
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserDetailedResponse'
 *       401:
 *         description: Необхідна автентифікація
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Користувача не знайдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /users/avatar:
 *   patch:
 *     summary: Оновлення аватара користувача
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *                 description: Файл зображення для аватара
 *     responses:
 *       200:
 *         description: Аватар успішно оновлено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AvatarUpdateResponse'
 *       400:
 *         description: Помилка при завантаженні файлу
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Необхідна автентифікація
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /users/followers:
 *   get:
 *     summary: Отримання списку підписників поточного користувача
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Список підписників
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserFollowersResponse'
 *       401:
 *         description: Необхідна автентифікація
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /users/following:
 *   get:
 *     summary: Отримання списку користувачів, на яких підписаний поточний користувач
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Список підписок
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserFollowingResponse'
 *       401:
 *         description: Необхідна автентифікація
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /users/{id}/follow:
 *   post:
 *     summary: Підписатися на користувача
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ідентифікатор користувача
 *     responses:
 *       200:
 *         description: Підписка успішно оформлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FollowResponse'
 *       400:
 *         description: Помилка підписки
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Необхідна автентифікація
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Користувача не знайдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /users/{id}/unfollow:
 *   post:
 *     summary: Відписатися від користувача
 *     tags: [Users]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ідентифікатор користувача
 *     responses:
 *       200:
 *         description: Підписка успішно скасована
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnfollowResponse'
 *       400:
 *         description: Помилка скасування підписки
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Необхідна автентифікація
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Користувача не знайдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
