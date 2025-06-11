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
      console.log("API Response:", data);

      return data.meals || [];
    } catch (error) {
      console.error("Error searching recipes:", error);
      throw new Error("Failed to search recipes. Please try again.");
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
      console.log("Ingredient search response:", data);

      return data.meals || [];
    } catch (error) {
      console.error("Error searching by ingredient:", error);
      throw new Error(
        "Failed to search recipes by ingredient. Please try again."
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
      console.log("Recipe details response:", data);

      return data.meals?.[0] || null;
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      throw new Error("Failed to load recipe details. Please try again.");
    }
  },

  // Get random recipes
  getRandomRecipes: async (count: number = 8): Promise<Recipe[]> => {
    try {
      const promises = Array.from({ length: count }, () =>
        fetch(`${BASE_URL}/random.php`).then((res) => res.json())
      );

      const responses = await Promise.all(promises);
      const recipes = responses.map((data) => data.meals?.[0]).filter(Boolean);

      console.log("Random recipes:", recipes);
      return recipes;
    } catch (error) {
      console.error("Error fetching random recipes:", error);
      throw new Error("Failed to load random recipes. Please try again.");
    }
  },
};
