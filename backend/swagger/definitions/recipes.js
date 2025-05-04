/**
 * @openapi
 * tags:
 *   name: Recipes
 *   description: Ендпоінти для роботи з рецептами
 *
 * /recipes:
 *   get:
 *     summary: Пошук рецептів з фільтрами
 *     description: Пошук рецептів за назвою, категорією, регіоном, інгредієнтами та часом приготування
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Номер сторінки
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Кількість рецептів на сторінці
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Фільтр за назвою рецепта
 *       - in: query
 *         name: category
 *         schema:
 *           type: integer
 *         description: Фільтр за ID категорії
 *       - in: query
 *         name: area
 *         schema:
 *           type: integer
 *         description: Фільтр за ID регіону
 *       - in: query
 *         name: ingredient
 *         schema:
 *           type: integer
 *         description: Фільтр за ID інгредієнта
 *       - in: query
 *         name: time
 *         schema:
 *           type: integer
 *         description: Максимальний час приготування в хвилинах
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [title, time, createdAt, -title, -time, -createdAt]
 *         description: Поле сортування
 *     responses:
 *       200:
 *         description: Список рецептів з пагінацією
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeListResponse'
 *       400:
 *         description: Помилка валідації параметрів запиту
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   post:
 *     summary: Створення нового рецепта
 *     description: Створення нового рецепта авторизованим користувачем
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/RecipeCreate'
 *     responses:
 *       201:
 *         description: Рецепт успішно створено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeDetailedResponse'
 *       400:
 *         description: Помилка валідації даних
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
 * /recipes/popular:
 *   get:
 *     summary: Отримання популярних рецептів
 *     description: Отримання рецептів, відсортованих за кількістю додавань у вибрані
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Номер сторінки
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Кількість рецептів на сторінці
 *     responses:
 *       200:
 *         description: Список популярних рецептів з пагінацією
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeListResponse'
 *
 * /recipes/own:
 *   get:
 *     summary: Отримання власних рецептів
 *     description: Отримання рецептів, створених поточним користувачем
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Номер сторінки
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Кількість рецептів на сторінці
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [title, time, createdAt, -title, -time, -createdAt]
 *         description: Поле сортування
 *     responses:
 *       200:
 *         description: Список власних рецептів з пагінацією
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeListResponse'
 *       401:
 *         description: Необхідна автентифікація
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /recipes/favorites:
 *   get:
 *     summary: Отримання вибраних рецептів
 *     description: Отримання рецептів, доданих у вибране поточним користувачем
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Номер сторінки
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Кількість рецептів на сторінці
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           enum: [title, time, createdAt, -title, -time, -createdAt]
 *         description: Поле сортування
 *     responses:
 *       200:
 *         description: Список вибраних рецептів з пагінацією
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeListResponse'
 *       401:
 *         description: Необхідна автентифікація
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /recipes/{id}:
 *   get:
 *     summary: Отримання детальної інформації про рецепт
 *     description: Отримання повної інформації про рецепт за його ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ідентифікатор рецепта
 *     responses:
 *       200:
 *         description: Детальна інформація про рецепт
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeDetailedResponse'
 *       404:
 *         description: Рецепт не знайдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   delete:
 *     summary: Видалення рецепта
 *     description: Видалення власного рецепта
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ідентифікатор рецепта
 *     responses:
 *       200:
 *         description: Рецепт успішно видалено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RecipeDeleteResponse'
 *       401:
 *         description: Необхідна автентифікація
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       403:
 *         description: Немає прав на видалення цього рецепта
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Рецепт не знайдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 * /recipes/{id}/favorite:
 *   post:
 *     summary: Додавання рецепта до вибраного
 *     description: Додавання рецепта до списку вибраних поточного користувача
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ідентифікатор рецепта
 *     responses:
 *       201:
 *         description: Рецепт успішно додано до вибраного
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteAddResponse'
 *       401:
 *         description: Необхідна автентифікація
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Рецепт не знайдено
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       409:
 *         description: Рецепт вже у вибраному
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *
 *   delete:
 *     summary: Видалення рецепта з вибраного
 *     description: Видалення рецепта зі списку вибраних поточного користувача
 *     tags: [Recipes]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Ідентифікатор рецепта
 *     responses:
 *       200:
 *         description: Рецепт успішно видалено з вибраного
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteRemoveResponse'
 *       401:
 *         description: Необхідна автентифікація
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Рецепт не знайдено у вибраному
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
