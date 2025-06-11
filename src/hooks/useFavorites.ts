import { favoritesService } from "@/lib/favorite";
import { FavoriteRecipe, Recipe } from "@/types/recipe";
import { useEffect, useState } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);

  useEffect(() => {
    setFavorites(favoritesService.getFavorites());
  }, []);

  const addToFavorites = (recipe: Recipe) => {
    favoritesService.addToFavorites(recipe);
    setFavorites(favoritesService.getFavorites());

    alert({
      title: "Added to Favorites!",
      description: `${recipe.strMeal} has been saved to your favorites.`,
      duration: 3000,
    });
  };

  const removeFromFavorites = (recipeId: string) => {
    const recipe = favorites.find((fav) => fav.id === recipeId);
    favoritesService.removeFromFavorites(recipeId);
    setFavorites(favoritesService.getFavorites());

    if (recipe) {
      alert({
        title: "Removed from Favorites",
        description: `${recipe.name} has been removed from your favorites.`,
        duration: 3000,
      });
    }
  };

  const isFavorite = (recipeId: string): boolean => {
    return favoritesService.isFavorite(recipeId);
  };

  const clearAllFavorites = () => {
    favoritesService.clearFavorites();
    setFavorites([]);

    alert({
      title: "Favorites Cleared",
      description: "All favorite recipes have been removed.",
      duration: 3000,
    });
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    clearAllFavorites,
    favoritesCount: favorites.length,
  };
};
