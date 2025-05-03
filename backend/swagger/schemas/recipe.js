/**
 * @openapi
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - title
 *         - instructions
 *         - categoryId
 *         - areaId
 *         - owner
 *       properties:
 *         id:
 *           type: integer
 *           description: Унікальний ідентифікатор рецепта
 *           example: 1
 *         title:
 *           type: string
 *           description: Назва рецепта
 *           example: "Український борщ"
 *         description:
 *           type: string
 *           description: Опис рецепта
 *           example: "Традиційний український борщ з пампушками"
 *         instructions:
 *           type: string
 *           description: Інструкції з приготування
 *           example: "1. Приготувати бульйон. 2. Підготувати овочі. 3. Додати буряк..."
 *         time:
 *           type: integer
 *           description: Час приготування в хвилинах
 *           example: 120
 *         thumb:
 *           type: string
 *           format: uri
 *           description: URL-адреса мініатюри рецепта
 *           example: "https://example.com/images/borsch_thumb.jpg"
 *         preview:
 *           type: string
 *           format: uri
 *           description: URL-адреса повного зображення рецепта
 *           example: "https://example.com/images/borsch_preview.jpg"
 *         categoryId:
 *           type: integer
 *           description: Ідентифікатор категорії рецепта
 *           example: 3
 *         areaId:
 *           type: integer
 *           description: Ідентифікатор регіону кухні
 *           example: 1
 *         owner:
 *           type: integer
 *           description: Ідентифікатор користувача, який створив рецепт
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
 *     RecipeIngredient:
 *       type: object
 *       required:
 *         - ingredientId
 *       properties:
 *         ingredientId:
 *           type: integer
 *           description: Ідентифікатор інгредієнта
 *           example: 23
 *         measure:
 *           type: string
 *           description: Кількість інгредієнта
 *           example: "200g"
 *
 *     RecipeResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Унікальний ідентифікатор рецепта
 *           example: 1
 *         title:
 *           type: string
 *           description: Назва рецепта
 *           example: "Український борщ"
 *         description:
 *           type: string
 *           description: Опис рецепта
 *           example: "Традиційний український борщ з пампушками"
 *         time:
 *           type: integer
 *           description: Час приготування в хвилинах
 *           example: 120
 *         thumb:
 *           type: string
 *           format: uri
 *           description: URL-адреса мініатюри рецепта
 *           example: "https://example.com/images/borsch_thumb.jpg"
 *         category:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 3
 *             name:
 *               type: string
 *               example: "Супи"
 *         area:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: "Українська"
 *
 *     RecipeDetailedResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Унікальний ідентифікатор рецепта
 *           example: 1
 *         title:
 *           type: string
 *           description: Назва рецепта
 *           example: "Український борщ"
 *         description:
 *           type: string
 *           description: Опис рецепта
 *           example: "Традиційний український борщ з пампушками"
 *         instructions:
 *           type: string
 *           description: Інструкції з приготування
 *           example: "1. Приготувати бульйон. 2. Підготувати овочі. 3. Додати буряк..."
 *         time:
 *           type: integer
 *           description: Час приготування в хвилинах
 *           example: 120
 *         thumb:
 *           type: string
 *           format: uri
 *           description: URL-адреса мініатюри рецепта
 *           example: "https://example.com/images/borsch_thumb.jpg"
 *         preview:
 *           type: string
 *           format: uri
 *           description: URL-адреса повного зображення рецепта
 *           example: "https://example.com/images/borsch_preview.jpg"
 *         category:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 3
 *             name:
 *               type: string
 *               example: "Супи"
 *         area:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             name:
 *               type: string
 *               example: "Українська"
 *         ingredients:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 12
 *               name:
 *                 type: string
 *                 example: "Буряк"
 *               measure:
 *                 type: string
 *                 example: "300г"
 *               img:
 *                 type: string
 *                 format: uri
 *                 example: "https://example.com/ingredients/beetroot.jpg"
 *         owner:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 42
 *             name:
 *               type: string
 *               example: "Марія Іваненко"
 *             avatar:
 *               type: string
 *               format: uri
 *               example: "https://example.com/avatars/maria.jpg"
 *         favorites:
 *           type: integer
 *           description: Кількість користувачів, які додали рецепт в улюблені
 *           example: 152
 *         isFavorite:
 *           type: boolean
 *           description: Чи додав поточний користувач рецепт в улюблені
 *           example: true
 *
 *     RecipeCreate:
 *       type: object
 *       required:
 *         - title
 *         - instructions
 *         - categoryId
 *         - areaId
 *         - ingredients
 *       properties:
 *         title:
 *           type: string
 *           description: Назва рецепта
 *           example: "Грибне різотто"
 *         description:
 *           type: string
 *           description: Опис рецепта
 *           example: "Класичне італійське різотто з білими грибами і пармезаном"
 *         instructions:
 *           type: string
 *           description: Інструкції з приготування
 *           example: "1. Підготувати грибний бульйон. 2. Обсмажити гриби окремо. 3. В глибокій сковороді розігріти оливкову олію..."
 *         time:
 *           type: integer
 *           description: Час приготування в хвилинах
 *           example: 45
 *         categoryId:
 *           type: integer
 *           description: Ідентифікатор категорії рецепта
 *           example: 5
 *         areaId:
 *           type: integer
 *           description: Ідентифікатор регіону кухні
 *           example: 2
 *         ingredients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/RecipeIngredient'
 *           example:
 *             - ingredientId: 23
 *               measure: "200г"
 *             - ingredientId: 15
 *               measure: "1 чашка"
 *         thumb:
 *           type: string
 *           format: binary
 *           description: Мініатюра рецепта (завантажуваний файл)
 *         preview:
 *           type: string
 *           format: binary
 *           description: Повне зображення рецепта (завантажуваний файл)
 *
 *     RecipeDeleteResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Повідомлення про успішне видалення
 *           example: "Recipe deleted successfully"
 *         id:
 *           type: integer
 *           description: Ідентифікатор видаленого рецепта
 *           example: 45
 *
 *     FavoriteAddResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Повідомлення про успішне додавання
 *           example: "Recipe added to favorites"
 *         recipeId:
 *           type: integer
 *           description: Ідентифікатор доданого рецепта
 *           example: 42
 *
 *     FavoriteRemoveResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Повідомлення про успішне видалення
 *           example: "Recipe removed from favorites"
 *         recipeId:
 *           type: integer
 *           description: Ідентифікатор видаленого рецепта
 *           example: 42
 *
 *     RecipeListResponse:
 *       allOf:
 *         - $ref: '#/components/schemas/PaginatedResponse'
 *         - type: object
 *           properties:
 *             data:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RecipeResponse'
 */
