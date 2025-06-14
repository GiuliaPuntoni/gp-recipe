import { recipeApi } from "@/lib/recipeApi";

global.fetch = jest.fn();

const mockRecipe = {
  idMeal: "123",
  strMeal: "Pizza",
  strMealThumb: "pizza.jpg",
  strCategory: "Fast Food",
  strArea: "Italian",
};

const mockResponse = {
  meals: [mockRecipe],
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe("recipeApi", () => {
  describe("searchRecipes", () => {
    test("returns recipes when API responds with data", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const data = await recipeApi.searchRecipes("pizza");
      expect(data).toEqual([mockRecipe]);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("search.php?s=pizza")
      );
    });

    test("returns empty array if no meals found", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ meals: null }),
      });

      const data = await recipeApi.searchRecipes("nonexistent");
      expect(data).toEqual([]);
    });

    test("throws error on failed response", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({ ok: false, status: 500 });

      await expect(recipeApi.searchRecipes("pizza")).rejects.toThrow(
        "HTTP error! status: 500"
      );
    });
  });

  describe("searchByIngredient", () => {
    test("returns recipes filtered by ingredient", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const data = await recipeApi.searchByIngredient("chicken");
      expect(data).toEqual([mockRecipe]);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("filter.php?i=chicken")
      );
    });

    test("throws error if ingredient is empty", async () => {
      await expect(recipeApi.searchByIngredient("")).rejects.toThrow(
        "Ingredient cannot be empty"
      );
    });

    test("throws error on failed fetch", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(recipeApi.searchByIngredient("chicken")).rejects.toThrow(
        "Failed to search recipes by ingredient"
      );
    });
  });

  describe("getRecipeById", () => {
    test("returns recipe details by ID", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ meals: [mockRecipe] }),
      });

      const recipe = await recipeApi.getRecipeById("123");
      expect(recipe).toEqual(mockRecipe);
      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining("lookup.php?i=123")
      );
    });

    test("returns null if recipe not found", async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ meals: null }),
      });

      const recipe = await recipeApi.getRecipeById("999");
      expect(recipe).toBeNull();
    });

    test("throws error if ID is missing", async () => {
      await expect(recipeApi.getRecipeById("")).rejects.toThrow(
        "Recipe ID is required"
      );
    });

    test("throws error on fetch failure", async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

      await expect(recipeApi.getRecipeById("123")).rejects.toThrow(
        "Failed to load recipe details"
      );
    });
  });
});
