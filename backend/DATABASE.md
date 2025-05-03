# Foodies Database Documentation

This document provides detailed information about the database models and their
relationships in the Foodies application.

## [Back to main page...](./README.md)

## Database Schema

The application uses a PostgreSQL database with Sequelize as the ORM. Below is a
detailed explanation of the models and their relationships.

## Models

### User

Represents users of the application.

**Fields:**

- `id` (INTEGER, Primary Key): Unique identifier
- `name` (STRING): User's name
- `email` (STRING, Unique): User's email address
- `password` (STRING): Hashed password
- `avatar` (STRING): URL to user's avatar image
- `token` (STRING): JWT token for authentication
- `refreshToken` (STRING): Token for refreshing authentication
- `createdAt` (DATE): Record creation timestamp
- `updatedAt` (DATE): Record update timestamp

### Recipe

Represents cooking recipes.

**Fields:**

- `id` (INTEGER, Primary Key): Unique identifier
- `title` (STRING): Recipe title
- `description` (TEXT): Recipe description
- `instructions` (TEXT): Cooking instructions
- `time` (INTEGER): Cooking time in minutes
- `thumb` (STRING): URL to recipe thumbnail image
- `preview` (STRING): URL to full-size recipe image
- `categoryId` (INTEGER, Foreign Key): Reference to Category
- `areaId` (INTEGER, Foreign Key): Reference to Area
- `owner` (INTEGER, Foreign Key): Reference to User who created the recipe
- `createdAt` (DATE): Record creation timestamp
- `updatedAt` (DATE): Record update timestamp

### Category

Represents recipe categories.

**Fields:**

- `id` (INTEGER, Primary Key): Unique identifier
- `name` (STRING, Unique): Category name
- `createdAt` (DATE): Record creation timestamp
- `updatedAt` (DATE): Record update timestamp

### Area

Represents regions/cuisines of origin for recipes.

**Fields:**

- `id` (INTEGER, Primary Key): Unique identifier
- `name` (STRING, Unique): Area name
- `createdAt` (DATE): Record creation timestamp
- `updatedAt` (DATE): Record update timestamp

### Ingredient

Represents food ingredients.

**Fields:**

- `id` (INTEGER, Primary Key): Unique identifier
- `name` (STRING, Unique): Ingredient name
- `desc` (TEXT): Ingredient description
- `img` (STRING): URL to ingredient image
- `createdAt` (DATE): Record creation timestamp
- `updatedAt` (DATE): Record update timestamp

### RecipeIngredient

Junction table for Recipe-Ingredient many-to-many relationship.

**Fields:**

- `recipeId` (INTEGER, Primary Key, Foreign Key): Reference to Recipe
- `ingredientId` (INTEGER, Primary Key, Foreign Key): Reference to Ingredient
- `measure` (STRING): Amount/measure of ingredient needed for the recipe
- `createdAt` (DATE): Record creation timestamp
- `updatedAt` (DATE): Record update timestamp

### Favorite

Junction table for User-Recipe favorites relationship.

**Fields:**

- `id` (INTEGER, Primary Key): Unique identifier
- `userId` (INTEGER, Foreign Key): Reference to User
- `recipeId` (INTEGER, Foreign Key): Reference to Recipe
- `createdAt` (DATE): Record creation timestamp
- `updatedAt` (DATE): Record update timestamp

### Follower

Junction table for User-User following relationship.

**Fields:**

- `id` (INTEGER, Primary Key): Unique identifier
- `followerId` (INTEGER, Foreign Key): Reference to User who is following
- `followingId` (INTEGER, Foreign Key): Reference to User who is being followed
- `createdAt` (DATE): Record creation timestamp
- `updatedAt` (DATE): Record update timestamp

### Testimonial

Represents user testimonials about the platform.

**Fields:**

- `id` (INTEGER, Primary Key): Unique identifier
- `testimonial` (TEXT): Testimonial content
- `owner` (INTEGER, Foreign Key): Reference to User who wrote the testimonial
- `createdAt` (DATE): Record creation timestamp
- `updatedAt` (DATE): Record update timestamp

## Relationships

### User Relationships

- **One-to-Many with Recipe**: A user can create many recipes

  ```javascript
  User.hasMany(Recipe, { foreignKey: 'owner', as: 'recipes' });
  Recipe.belongsTo(User, { foreignKey: 'owner', as: 'user' });
  ```

- **Many-to-Many with Recipe (Favorites)**: A user can have many favorite
  recipes

  ```javascript
  User.belongsToMany(Recipe, {
    through: Favorite,
    foreignKey: 'userId',
    as: 'favorites',
  });
  Recipe.belongsToMany(User, {
    through: Favorite,
    foreignKey: 'recipeId',
    as: 'favoritedBy',
  });
  ```

- **Many-to-Many with User (Following)**: A user can follow many users and be
  followed by many users

  ```javascript
  User.belongsToMany(User, {
    through: Follower,
    foreignKey: 'followerId',
    as: 'following',
    otherKey: 'followingId',
  });
  User.belongsToMany(User, {
    through: Follower,
    foreignKey: 'followingId',
    as: 'followers',
    otherKey: 'followerId',
  });
  ```

- **One-to-Many with Testimonial**: A user can create many testimonials
  ```javascript
  User.hasMany(Testimonial, { foreignKey: 'owner', as: 'testimonials' });
  Testimonial.belongsTo(User, { foreignKey: 'owner', as: 'user' });
  ```

### Recipe Relationships

- **Many-to-One with Category**: A recipe belongs to one category

  ```javascript
  Category.hasMany(Recipe, { foreignKey: 'categoryId', as: 'recipes' });
  Recipe.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });
  ```

- **Many-to-One with Area**: A recipe belongs to one area/cuisine

  ```javascript
  Area.hasMany(Recipe, { foreignKey: 'areaId', as: 'recipes' });
  Recipe.belongsTo(Area, { foreignKey: 'areaId', as: 'area' });
  ```

- **Many-to-Many with Ingredient**: A recipe can have many ingredients, and an
  ingredient can be used in many recipes
  ```javascript
  Recipe.belongsToMany(Ingredient, {
    through: RecipeIngredient,
    foreignKey: 'recipeId',
    as: 'ingredients',
  });
  Ingredient.belongsToMany(Recipe, {
    through: RecipeIngredient,
    foreignKey: 'ingredientId',
    as: 'recipes',
  });
  ```

## Database Setup

The application uses Sequelize to interact with the PostgreSQL database.
Sequelize is configured in `db/sequelize.js`:

```javascript
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: process.env.DATABASE_DIALECT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  port: process.env.DATABASE_PORT,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: true, // Can set to false in production
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1);
  }
}

export { connectToDatabase };
export default sequelize;
```

## Database Seeding

The application includes seed scripts to populate the database with initial
data:

- `scripts/seedUsers.js` - Seed user accounts
- `scripts/seedAreas.js` - Seed cuisine areas
- `scripts/seedCategories.js` - Seed recipe categories
- `scripts/seedIngredients.js` - Seed ingredients
- `scripts/seedRecipes.js` - Seed recipes with ingredients
- `scripts/seedTestimonials.js` - Seed user testimonials

To run the seeders, use the following commands:

```bash
npm run seed:users
npm run seed:areas
npm run seed:categories
npm run seed:ingredients
npm run seed:recipes
npm run seed:testimonials
```

## Migrations

The application does not have explicit migration files, as Sequelize's model
definitions handle schema creation and updates.

When deploying to a production environment, it's recommended to add proper
migration scripts to handle schema changes safely.

## Entity-Relationship Diagram

Below is a simplified representation of the database schema:

```
User 1──N Recipe
 │      /│\
 │       │
 │       │
\│/      │
Testimonial

User N──M Recipe (through Favorite)

User N──M User (through Follower)

Category 1──N Recipe

Area 1──N Recipe

Recipe N──M Ingredient (through RecipeIngredient)
```

This diagram shows the primary relationships between entities in the system.
