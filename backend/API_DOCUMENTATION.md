# Foodies API Documentation

## [Back to main page...](./README.md)

This document provides detailed information about the API endpoints available in
the Foodies application.

Documentation on the remote server is available at
[https://foodies-app-pke3.onrender.com/api-docs](https://foodies-app-pke3.onrender.com/api-docs)

## Authentication

### Registration

```
POST /api/auth/register
```

Register a new user in the system.

**Request Body:**

```json
{
  "name": "Ivan Petrenko",
  "email": "ivan@example.com",
  "password": "password123"
}
```

**Response (201 Created):**

```json
{
  "message": "Registration successful",
  "user": {
    "id": 1,
    "name": "Ivan Petrenko",
    "email": "ivan@example.com",
    "avatar": "https://www.gravatar.com/avatar/abc123"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Login

```
POST /api/auth/login
```

Authenticate a user and return JWT tokens.

**Request Body:**

```json
{
  "email": "ivan@example.com",
  "password": "password123"
}
```

**Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "ivan@example.com"
  }
}
```

### Refresh Token

```
POST /api/auth/refresh
```

Refresh an expired authentication token.

**Request Body:**

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Response (200 OK):**

```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Logout

```
POST /api/auth/logout
```

Invalidate the current user's token.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (204 No Content)**

## Users

### Get Current User

```
GET /api/users/current
```

Retrieve information about the authenticated user.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**

```json
{
  "user": {
    "id": 1,
    "name": "Ivan Petrenko",
    "email": "ivan@example.com",
    "avatar": "https://example.com/avatars/ivan.jpg"
  }
}
```

### Get User Detailed Info

```
GET /api/users/:id
```

Get detailed information about a specific user.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**

```json
{
  "id": 1,
  "name": "Ivan Petrenko",
  "email": "ivan@example.com",
  "avatar": "https://example.com/avatars/ivan.jpg",
  "stats": {
    "recipes": 12,
    "followers": 45,
    "favorites": 28,
    "following": 32
  }
}
```

Note: When requesting information about another user, the `favorites` and
`following` stats will not be included.

### Update Avatar

```
PATCH /api/users/avatar
```

Update the avatar of the authenticated user.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data
```

**Request Body:**

```
avatar: [file upload]
```

**Response (200 OK):**

```json
{
  "avatar": "https://example.com/avatars/ivan_new.jpg",
  "message": "Avatar was successfully updated"
}
```

### Follow User

```
POST /api/users/:id/follow
```

Follow another user.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**

```json
{
  "message": "Followed user successfully"
}
```

### Unfollow User

```
POST /api/users/:id/unfollow
```

Unfollow a user.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**

```json
{
  "message": "Unfollowed user successfully"
}
```

### Get Followers

```
GET /api/users/followers
```

Get list of users following the authenticated user.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**

```json
{
  "response": [
    {
      "id": 2,
      "name": "Olena Kovalenko",
      "email": "olena@example.com",
      "avatar": "https://example.com/avatars/olena.jpg"
    }
    // ...more followers
  ]
}
```

### Get Following

```
GET /api/users/following
```

Get list of users the authenticated user is following.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**

```json
{
  "response": [
    {
      "id": 3,
      "name": "Petro Sydorenko",
      "email": "petro@example.com",
      "avatar": "https://example.com/avatars/petro.jpg"
    }
    // ...more following users
  ]
}
```

## Categories, Areas, and Ingredients

### Get Categories

```
GET /api/categories
```

Get all recipe categories.

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "name": "Soups"
  },
  {
    "id": 2,
    "name": "Desserts"
  }
  // ...more categories
]
```

### Get Areas

```
GET /api/areas
```

Get all cuisine regions.

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "name": "Ukrainian"
  },
  {
    "id": 2,
    "name": "Italian"
  }
  // ...more areas
]
```

### Get Ingredients

```
GET /api/ingredients
```

Get all ingredients.

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "name": "Chicken Broth",
    "desc": "Rich broth made from chicken and vegetables",
    "img": "https://example.com/images/ingredients/chicken_broth.jpg"
  }
  // ...more ingredients
]
```

## Recipes

### Search Recipes

```
GET /api/recipes
```

Search recipes with filters.

**Query Parameters:**

- `page` (default: 1) - Page number for pagination
- `limit` (default: 10) - Number of recipes per page
- `title` - Search by recipe title
- `category` - Filter by category ID
- `area` - Filter by area ID
- `ingredient` - Filter by ingredient ID
- `time` - Maximum cooking time in minutes
- `sort` - Sort field (title, time, createdAt, -title, -time, -createdAt)

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Ukrainian Borsch",
      "description": "Traditional Ukrainian borsch with pampushky",
      "time": 120,
      "thumb": "https://example.com/images/borsch_thumb.jpg",
      "category": {
        "id": 3,
        "name": "Soups"
      },
      "area": {
        "id": 1,
        "name": "Ukrainian"
      }
    }
    // ...more recipes
  ],
  "pagination": {
    "totalItems": 150,
    "totalPages": 15,
    "currentPage": 2,
    "perPage": 10,
    "nextPage": 3,
    "prevPage": 1
  }
}
```

### Get Recipe by ID

```
GET /api/recipes/:id
```

Get detailed recipe information.

**Response (200 OK):**

```json
{
  "id": 1,
  "title": "Ukrainian Borsch",
  "description": "Traditional Ukrainian borsch with pampushky",
  "instructions": "1. Make the broth. 2. Prepare vegetables. 3. Add beetroot...",
  "time": 120,
  "thumb": "https://example.com/images/borsch_thumb.jpg",
  "preview": "https://example.com/images/borsch_preview.jpg",
  "category": {
    "id": 3,
    "name": "Soups"
  },
  "area": {
    "id": 1,
    "name": "Ukrainian"
  },
  "ingredients": [
    {
      "id": 12,
      "name": "Beetroot",
      "measure": "300g",
      "img": "https://example.com/ingredients/beetroot.jpg"
    }
    // ...more ingredients
  ],
  "owner": {
    "id": 42,
    "name": "Maria Ivanenko",
    "avatar": "https://example.com/avatars/maria.jpg"
  },
  "favorites": 152,
  "isFavorite": true
}
```

### Get Popular Recipes

```
GET /api/recipes/popular
```

Get popular recipes sorted by number of favorites.

**Query Parameters:**

- `page` (default: 1) - Page number for pagination
- `limit` (default: 10) - Number of recipes per page

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Ukrainian Borsch",
      "description": "Traditional Ukrainian borsch with pampushky",
      "time": 120,
      "thumb": "https://example.com/images/borsch_thumb.jpg",
      "category": {
        "id": 3,
        "name": "Soups"
      },
      "area": {
        "id": 1,
        "name": "Ukrainian"
      }
    }
    // ...more recipes
  ],
  "pagination": {
    "totalItems": 150,
    "totalPages": 15,
    "currentPage": 1,
    "perPage": 10,
    "nextPage": 2,
    "prevPage": null
  }
}
```

### Create Recipe

```
POST /api/recipes
```

Create a new recipe.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: multipart/form-data
```

**Request Body:**

```
title: "Mushroom Risotto"
description: "Classic Italian risotto with white mushrooms and parmesan"
instructions: "1. Prepare mushroom broth. 2. Sauté mushrooms separately. 3. In a deep pan, heat olive oil..."
time: 45
categoryId: 5
areaId: 2
ingredients: [
  { "ingredientId": 23, "measure": "200g" },
  { "ingredientId": 15, "measure": "1 cup" }
]
thumb: [file upload]
preview: [file upload]
```

**Response (201 Created):**

```json
{
  "id": 45,
  "title": "Mushroom Risotto",
  "description": "Classic Italian risotto with white mushrooms and parmesan",
  "instructions": "1. Prepare mushroom broth. 2. Sauté mushrooms separately. 3. In a deep pan, heat olive oil...",
  "time": 45,
  "thumb": "https://example.com/images/risotto_thumb.jpg",
  "preview": "https://example.com/images/risotto_preview.jpg",
  "category": {
    "id": 5,
    "name": "Risotto"
  },
  "area": {
    "id": 2,
    "name": "Italian"
  },
  "ingredients": [
    {
      "id": 23,
      "name": "Mushrooms",
      "measure": "200g",
      "img": "https://example.com/ingredients/mushrooms.jpg"
    },
    {
      "id": 15,
      "name": "Arborio Rice",
      "measure": "1 cup",
      "img": "https://example.com/ingredients/arborio_rice.jpg"
    }
  ],
  "owner": {
    "id": 1,
    "name": "Ivan Petrenko",
    "avatar": "https://example.com/avatars/ivan.jpg"
  }
}
```

### Delete Recipe

```
DELETE /api/recipes/:id
```

Delete a recipe owned by the authenticated user.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**

```json
{
  "message": "Recipe deleted successfully",
  "id": 45
}
```

### Add to Favorites

```
POST /api/recipes/:id/favorite
```

Add a recipe to the authenticated user's favorites.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (201 Created):**

```json
{
  "message": "Recipe added to favorites",
  "recipeId": 42
}
```

### Remove from Favorites

```
DELETE /api/recipes/:id/favorite
```

Remove a recipe from the authenticated user's favorites.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Response (200 OK):**

```json
{
  "message": "Recipe removed from favorites",
  "recipeId": 42
}
```

### Get Favorite Recipes

```
GET /api/recipes/favorites
```

Get favorite recipes of the authenticated user.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**

- `page` (default: 1) - Page number for pagination
- `limit` (default: 10) - Number of recipes per page
- `sort` - Sort field (title, time, createdAt, -title, -time, -createdAt)

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Ukrainian Borsch",
      "description": "Traditional Ukrainian borsch with pampushky",
      "time": 120,
      "thumb": "https://example.com/images/borsch_thumb.jpg",
      "category": {
        "id": 3,
        "name": "Soups"
      },
      "area": {
        "id": 1,
        "name": "Ukrainian"
      }
    }
    // ...more recipes
  ],
  "pagination": {
    "totalItems": 28,
    "totalPages": 3,
    "currentPage": 1,
    "perPage": 10,
    "nextPage": 2,
    "prevPage": null
  }
}
```

### Get User Recipes

```
GET /api/recipes/own
```

Get recipes created by the authenticated user.

**Headers:**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Query Parameters:**

- `page` (default: 1) - Page number for pagination
- `limit` (default: 10) - Number of recipes per page
- `sort` - Sort field (title, time, createdAt, -title, -time, -createdAt)

**Response (200 OK):**

```json
{
  "data": [
    {
      "id": 45,
      "title": "Mushroom Risotto",
      "description": "Classic Italian risotto with white mushrooms and parmesan",
      "time": 45,
      "thumb": "https://example.com/images/risotto_thumb.jpg",
      "category": {
        "id": 5,
        "name": "Risotto"
      },
      "area": {
        "id": 2,
        "name": "Italian"
      }
    }
    // ...more recipes
  ],
  "pagination": {
    "totalItems": 12,
    "totalPages": 2,
    "currentPage": 1,
    "perPage": 10,
    "nextPage": 2,
    "prevPage": null
  }
}
```

## Testimonials

### Get Testimonials

```
GET /api/testimonials
```

Get user testimonials about the platform.

**Response (200 OK):**

```json
[
  {
    "id": 1,
    "testimonial": "Foodies is the best recipe site I've found! Great interface and variety of recipes for any taste.",
    "owner": {
      "id": 42,
      "name": "Maria Ivanenko",
      "avatar": "https://example.com/avatars/maria.jpg"
    }
  }
  // ...more testimonials
]
```

## Error Responses

All error responses follow this format:

```json
{
  "message": "Error description"
}
```

Common HTTP status codes:

- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `409 Conflict` - Resource conflict (e.g., email already in use)
- `500 Internal Server Error` - Server error
