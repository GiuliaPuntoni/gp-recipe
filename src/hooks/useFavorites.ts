import { favoritesService } from "@/lib/favorite";
import { setToastMessage, setToastOpen } from "@/store/recipeSlice";
import { useAppDispatch } from "@/store/store";
import { FavoriteRecipe, Recipe } from "@/types/recipe";
import { useEffect, useState } from "react";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteRecipe[]>([]);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setFavorites(favoritesService.getFavorites());
  }, []);

  const addToFavorites = (recipe: Recipe) => {
    favoritesService.addToFavorites(recipe);
    setFavorites(favoritesService.getFavorites());

    dispatch(
      setToastMessage(`${recipe.strMeal} has been saved to your favorites.`)
    );
    dispatch(setToastOpen(true));
  };

  const removeFromFavorites = (recipeId: string) => {
    const recipe = favorites.find((fav) => fav.idMeal === recipeId);
    favoritesService.removeFromFavorites(recipeId);
    setFavorites(favoritesService.getFavorites());

    if (recipe) {
      dispatch(
        setToastMessage(
          `${recipe.strMeal} has been removed from your favorites.`
        )
      );
      dispatch(setToastOpen(true));
    }
  };

  const isFavorite = (recipeId: string): boolean => {
    return favoritesService.isFavorite(recipeId);
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
  };
};
