import User from './models/User.js';
import Recipe from './models/Recipe.js';
import Category from './models/Category.js';
import Ingredient from './models/Ingredient.js';
import RecipeIngredient from './models/RecipeIngredient.js';
import Area from './models/Area.js';
import Testimonial from './models/Testimonial.js';
import Favorite from './models/Favorite.js';
import Follower from './models/Follower.js';

User.hasMany(Recipe, { foreignKey: 'owner', as: 'recipes' });
Recipe.belongsTo(User, { foreignKey: 'owner', as: 'user' });

Category.hasMany(Recipe, { foreignKey: 'categoryId', as: 'recipes' });
Recipe.belongsTo(Category, { foreignKey: 'categoryId', as: 'category' });

Area.hasMany(Recipe, { foreignKey: 'areaId', as: 'recipes' });
Recipe.belongsTo(Area, { foreignKey: 'areaId', as: 'area' });

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

User.hasMany(Testimonial, { foreignKey: 'owner', as: 'testimonials' });
Testimonial.belongsTo(User, { foreignKey: 'owner', as: 'user' });

export default {
  User,
  Recipe,
  Category,
  Ingredient,
  RecipeIngredient,
  Area,
  Testimonial,
  Favorite,
  Follower,
};
