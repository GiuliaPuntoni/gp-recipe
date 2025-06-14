import { FavoriteRecipe, Recipe } from "@/types/recipe";

const FAVORITES_KEY = "recipe-finder-favorites";

export const favoritesService = {
  // Get all favorite recipes from localStorage
  getFavorites: (): FavoriteRecipe[] => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return parsed.map((fav: any) =>
        fav.idMeal ? fav : { ...fav, idMeal: fav.id }
      );
    } catch (error) {
      console.error("Error loading favorites:", error);
      return [];
    }
  },

  // Add a recipe to favorites
  addToFavorites: (recipe: Recipe): void => {
    try {
      const favorites = favoritesService.getFavorites();
      const favoriteRecipe: FavoriteRecipe = {
        idMeal: recipe.idMeal,
        strMeal: recipe.strMeal,
        strMealThumb: recipe.strMealThumb,
        strCategory: recipe.strCategory,
        strArea: recipe.strArea,
        dateAdded: new Date().toISOString(),
      };

      const updatedFavorites = [
        favoriteRecipe,
        ...favorites.filter((fav) => fav.idMeal !== recipe.idMeal),
      ];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error adding to favorites:", error);
    }
  },

  // Remove a recipe from favorites
  removeFromFavorites: (recipeId: string): void => {
    try {
      const favorites = favoritesService.getFavorites();
      const updatedFavorites = favorites.filter(
        (fav) => fav.idMeal !== recipeId
      );
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error("Error removing from favorites:", error);
    }
  },

  // Check if a recipe is in favorites
  isFavorite: (recipeId: string): boolean => {
    try {
      const favorites = favoritesService.getFavorites();
      return favorites.some((fav) => fav.idMeal === recipeId);
    } catch (error) {
      console.error("Error checking favorite status:", error);
      return false;
    }
  },
};
