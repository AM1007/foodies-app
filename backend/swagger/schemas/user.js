/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: integer
 *           description: Унікальний ідентифікатор користувача
 *           example: 1
 *         name:
 *           type: string
 *           description: Ім'я користувача
 *           example: "Іван Петренко"
 *         email:
 *           type: string
 *           format: email
 *           description: Електронна пошта користувача (унікальна)
 *           example: "ivan@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: Хешований пароль користувача
 *           example: "$2b$10$..."
 *         avatar:
 *           type: string
 *           format: uri
 *           description: URL-адреса аватару користувача
 *           example: "https://example.com/avatars/ivan.jpg"
 *         token:
 *           type: string
 *           description: JWT токен для аутентифікації
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         refreshToken:
 *           type: string
 *           description: Токен для оновлення JWT токену
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
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
 *     UserResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Унікальний ідентифікатор користувача
 *           example: 1
 *         name:
 *           type: string
 *           description: Ім'я користувача
 *           example: "Іван Петренко"
 *         email:
 *           type: string
 *           format: email
 *           description: Електронна пошта користувача
 *           example: "ivan@example.com"
 *         avatar:
 *           type: string
 *           format: uri
 *           description: URL-адреса аватару користувача
 *           example: "https://example.com/avatars/ivan.jpg"
 *
 *     RegisterUserRequest:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         name:
 *           type: string
 *           description: Ім'я користувача
 *           example: "Іван Петренко"
 *         email:
 *           type: string
 *           format: email
 *           description: Електронна пошта користувача
 *           example: "ivan@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: Пароль користувача
 *           example: "password123"
 *
 *     RegisterResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           description: Повідомлення про успішну реєстрацію
 *           example: "Registration successful"
 *         user:
 *           $ref: '#/components/schemas/UserResponse'
 *         token:
 *           type: string
 *           description: JWT токен для аутентифікації
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         refreshToken:
 *           type: string
 *           description: Токен для оновлення JWT токену
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: Електронна пошта користувача
 *           example: "ivan@example.com"
 *         password:
 *           type: string
 *           format: password
 *           description: Пароль користувача
 *           example: "password123"
 *
 *     LoginResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: JWT токен для аутентифікації
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         refreshToken:
 *           type: string
 *           description: Токен для оновлення JWT токену
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               description: Унікальний ідентифікатор користувача
 *               example: 1
 *             email:
 *               type: string
 *               format: email
 *               description: Електронна пошта користувача
 *               example: "ivan@example.com"
 *
 *     RefreshTokenRequest:
 *       type: object
 *       required:
 *         - refreshToken
 *       properties:
 *         refreshToken:
 *           type: string
 *           description: Токен для оновлення JWT токену
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *
 *     RefreshTokenResponse:
 *       type: object
 *       properties:
 *         token:
 *           type: string
 *           description: Новий JWT токен для аутентифікації
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *
 *     UserDetailedResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Унікальний ідентифікатор користувача
 *           example: 1
 *         name:
 *           type: string
 *           description: Ім'я користувача
 *           example: "Іван Петренко"
 *         email:
 *           type: string
 *           format: email
 *           description: Електронна пошта користувача
 *           example: "ivan@example.com"
 *         avatar:
 *           type: string
 *           format: uri
 *           description: URL-адреса аватару користувача
 *           example: "https://example.com/avatars/ivan.jpg"
 *         stats:
 *           type: object
 *           properties:
 *             recipes:
 *               type: integer
 *               description: Кількість рецептів, створених користувачем
 *               example: 12
 *             followers:
 *               type: integer
 *               description: Кількість підписників користувача
 *               example: 45
 *             favorites:
 *               type: integer
 *               description: Кількість улюблених рецептів користувача
 *               example: 28
 *             following:
 *               type: integer
 *               description: Кількість користувачів, на яких підписаний користувач
 *               example: 32
 *
 *     UserListResponse:
 *       type: object
 *       properties:
 *         users:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserResponse'
 *
 *     FollowResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Followed user successfully"
 *
 *     UnfollowResponse:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: "Unfollowed user successfully"
 *
 *     UserFollowersResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserResponse'
 *
 *     UserFollowingResponse:
 *       type: object
 *       properties:
 *         response:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/UserResponse'
 *
 *     AvatarUpdateResponse:
 *       type: object
 *       properties:
 *         avatar:
 *           type: string
 *           format: uri
 *           description: URL-адреса оновленого аватару
 *           example: "https://example.com/avatars/ivan_new.jpg"
 *         message:
 *           type: string
 *           description: Повідомлення про успішне оновлення
 *           example: "Avatar was successfully updated"
 */
