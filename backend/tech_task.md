# Technical Specifications

## [Back to main page...](README.md)

### Server Requirements

- Deploy a development server (connect modules, configure CORS, write error
  handling functions, etc.)
- Initialize and connect the database to the project
- Create swagger documentation for endpoints (optional task)

### /users

- Create a public endpoint for user registration
- Create a public endpoint for user login
- Write an authorization middleware
- Create a private endpoint to retrieve information about the current user
- Create a private endpoint to retrieve detailed information about a user:

- If an authorized user requests information about themselves, the response
  should contain user information (avatar, name, email) and information about
  the number of recipes created by the user, number of favorite recipes, number
  of users following the authorized user, and number of profiles the authorized
  user follows
- If an authorized user requests information about another user, the response
  should contain user information (avatar, name, email) and information about
  the number of recipes created by the user and the number of users following
  that user

- Create a private endpoint for updating the authorized user's avatar
- Create a private endpoint to get information about users who follow the user's
  profile
- Create a private endpoint to get information about users followed by the
  authorized user
- Create a private endpoint to add a user to the list of profiles followed by
  the authorized user
- Create a private endpoint to remove a user from the list of profiles followed
  by the authorized user
- Create a private endpoint for user logout

### /categories

- Create a public endpoint to get a list of recipe categories

### /areas

- Create a public endpoint to get a list of regional cuisines

### /ingredients

- Create a public endpoint to get a list of ingredients

### /testimonials

- Create a public endpoint to get a list of testimonials

### /recipes

- Create a public endpoint to search for recipes by category, ingredient, and
  regional cuisine (with pagination logic)
- Create a public endpoint to get detailed information about a recipe by its id
- Create a public endpoint to get popular recipes (popularity should be
  calculated based on the number of users who added the recipe to favorites)
- Create a private endpoint for creating a personal recipe Create a private
  endpoint for deleting a personal recipe - Create a private endpoint for
  retrieving personal recipes Create a private endpoint for adding a recipe to
  the favorites list
- Create a private endpoint for removing a recipe from the favorites list Create
  a private endpoint for retrieving favorite recipes
