import { Recipe, RecipeSearchResponse } from "@/types/recipe";

const BASE_URL = "https://www.themealdb.com/api/json/v1/1";

export const recipeApi = {
  // Search recipes by name
  searchRecipes: async (query: string): Promise<Recipe[]> => {
    // if (!query.trim()) {
    //   throw new Error("Search query cannot be empty");
    // }

    try {
      const response = await fetch(
        `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: RecipeSearchResponse = await response.json();

      return data.meals || [];
    } catch (error) {
      throw new Error(`Failed to search recipes. ${error}. Please try again.`);
    }
  },

  // Search recipes by ingredient
  searchByIngredient: async (ingredient: string): Promise<Recipe[]> => {
    if (!ingredient.trim()) {
      throw new Error("Ingredient cannot be empty");
    }

    try {
      const response = await fetch(
        `${BASE_URL}/filter.php?i=${encodeURIComponent(ingredient)}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: RecipeSearchResponse = await response.json();

      return data.meals || [];
    } catch (error) {
      throw new Error(
        `Failed to search recipes by ingredient. ${error}. Please try again.`
      );
    }
  },

  // Get recipe details by ID
  getRecipeById: async (id: string): Promise<Recipe | null> => {
    if (!id) {
      throw new Error("Recipe ID is required");
    }

    try {
      const response = await fetch(`${BASE_URL}/lookup.php?i=${id}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: RecipeSearchResponse = await response.json();

      return data.meals?.[0] || null;
    } catch (error) {
      throw new Error(
        `Failed to load recipe details. ${error}. Please try again.`
      );
    }
  },
};
