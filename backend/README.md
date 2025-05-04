# Foodies API 🍲

## [Back to main page...](../README.md)

## [Technical Specifications](./tech_task.md)

A RESTful API for a culinary social platform where users can discover, share,
and manage recipes.

## 📋 Overview

Foodies API is a backend service that powers a culinary social network
application. It allows users to:

- Discover recipes from various regions and categories
- Create and share their own recipes
- Follow other users and build a cooking community
- Save favorite recipes for easy access
- Explore popular recipes based on community engagement

## 🛠️ Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **Validation**: Joi
- **Documentation**: OpenAPI/Swagger

## 🔑 Key Features

- **User Authentication**: Registration with automatic authentication, login,
  logout, and token refresh
- **User Profiles**: View user details, update avatars, follow/unfollow users
- **Recipe Management**: Create, search, and delete recipes
- **Social Features**: Follow other users, favorite recipes
- **Content Discovery**: Search recipes by category, area, ingredients, or title
- **Documentation**: Interactive API documentation with Swagger

## 🗂️ Project Structure

```
.
├── app.js                 # Application entry point
├── constants              # Application constants
├── controllers            # Request handlers
├── db                     # Database configuration and models
│   ├── associations.js    # Sequelize associations
│   ├── models             # Database models
│   └── sequelize.js       # Sequelize configuration
├── decorators             # Function wrappers
├── docs                   # API documentation
├── helpers                # Utility functions
├── middlewares            # Express middlewares
├── mockData               # Sample data for seeding
├── routes                 # API routes
├── schemas                # Validation schemas
├── scripts                # Database seeding scripts
├── services               # Business logic
└── swagger                # Swagger configuration
```

## 📝 API Endpoints

## [API DOCUMENTATION](./API_DOCUMENTATION.md)

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and receive auth tokens
- `POST /api/auth/refresh` - Refresh authentication token
- `POST /api/auth/logout` - Logout (invalidate token)

### Users

- `GET /api/users/current` - Get current user info
- `GET /api/users/:id` - Get detailed user info
- `PATCH /api/users/avatar` - Update user avatar
- `GET /api/users` - Get all users
- `POST /api/users/:id/follow` - Follow a user
- `POST /api/users/:id/unfollow` - Unfollow a user
- `GET /api/users/followers` - Get user's followers
- `GET /api/users/following` - Get users followed by current user

### Recipes

- `GET /api/recipes` - Search recipes with filters
- `GET /api/recipes/:id` - Get detailed recipe info
- `GET /api/recipes/popular` - Get popular recipes
- `GET /api/recipes/own` - Get current user's recipes
- `POST /api/recipes` - Create a new recipe
- `DELETE /api/recipes/:id` - Delete a recipe
- `POST /api/recipes/:id/favorite` - Add recipe to favorites
- `DELETE /api/recipes/:id/favorite` - Remove recipe from favorites
- `GET /api/recipes/favorites` - Get favorite recipes

### Categories, Areas, Ingredients, Testimonials

- `GET /api/categories` - Get all recipe categories
- `GET /api/areas` - Get all cuisine regions
- `GET /api/ingredients` - Get all ingredients
- `GET /api/testimonials` - Get user testimonials

## 🚀 Getting Started

### Prerequisites

- Node.js (v14+)
- PostgreSQL
- Cloudinary account (for image uploads)

### Installation

1. Clone the repository

   ```bash
   git clone https://github.com/yourusername/foodies-api.git
   cd foodies-api
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`

   ```
   # Server settings
   PORT=3000
   NODE_ENV=development

   # Database settings
   DATABASE_DIALECT=postgres
   DATABASE_USERNAME=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_HOST=localhost
   DATABASE_NAME=foodies_db
   DATABASE_PORT=5432

   # JWT settings
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=1d

   # Cloudinary settings
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```

4. Set up the database

   ```bash
   # Create database (in PostgreSQL)
   createdb foodies_db

   # Run database seeders
   npm run seed:users
   npm run seed:areas
   npm run seed:categories
   npm run seed:ingredients
   npm run seed:recipes
   ```

5. Start the server

   ```bash
   # Development mode
   npm run dev

   # Production mode
   npm start
   ```

6. Access API documentation at `http://localhost:3000/api-docs`

## 📚 Documentation

The API is documented using OpenAPI Specification. You can access the
documentation in two formats:

- Swagger UI: `http://localhost:3000/api-docs`

## 📦 Database Schema

## [DATABASE](./DATABASE.md)

The application uses a relational database with the following main entities:

- **Users**: Account information and user profiles
- **Recipes**: Recipe details including instructions and cooking time
- **Categories**: Classification of recipes (e.g., Soups, Desserts)
- **Areas**: Regions/cuisines (e.g., Ukrainian, Italian)
- **Ingredients**: Food ingredients with descriptions and images
- **Favorites**: Junction table for users' favorite recipes
- **Followers**: Junction table for user follows

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
