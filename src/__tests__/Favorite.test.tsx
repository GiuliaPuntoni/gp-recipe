import { favoritesService } from "@/lib/favorite";
import { Recipe } from "@/types/recipe";

const sampleRecipe = {
  idMeal: "123",
  strMeal: "Pizza",
  strMealThumb: "pizza.jpg",
  strCategory: "Fast Food",
  strArea: "Italian",
} as Recipe;

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("favoritesService", () => {
  test("should return empty array if no favorites stored", () => {
    expect(favoritesService.getFavorites()).toEqual([]);
  });

  test("should add a recipe to favorites", () => {
    favoritesService.addToFavorites(sampleRecipe);
    const stored = JSON.parse(localStorage.getItem("recipe-finder-favorites")!);
    expect(stored[0].idMeal).toBe("123");
  });

  test("should not duplicate favorites with same id", () => {
    favoritesService.addToFavorites(sampleRecipe);
    favoritesService.addToFavorites(sampleRecipe);
    const stored = JSON.parse(localStorage.getItem("recipe-finder-favorites")!);
    expect(stored.length).toBe(1);
  });

  test("should remove a recipe from favorites", () => {
    favoritesService.addToFavorites(sampleRecipe);
    favoritesService.removeFromFavorites("123");
    const stored = JSON.parse(localStorage.getItem("recipe-finder-favorites")!);
    expect(stored).toEqual([]);
  });

  test("should detect if a recipe is in favorites", () => {
    favoritesService.addToFavorites(sampleRecipe);
    expect(favoritesService.isFavorite("123")).toBe(true);
    expect(favoritesService.isFavorite("999")).toBe(false);
  });

  test("should handle corrupted JSON in localStorage gracefully", () => {
    localStorage.setItem("recipe-finder-favorites", "{not valid json}");
    const result = favoritesService.getFavorites();
    expect(result).toEqual([]);
  });

  test("should normalize recipes with 'id' instead of 'idMeal'", () => {
    const malformedData = [
      {
        id: "456",
        strMeal: "Malform",
        strMealThumb: "",
        strCategory: "",
        strArea: "",
      },
    ];
    localStorage.setItem(
      "recipe-finder-favorites",
      JSON.stringify(malformedData)
    );
    const result = favoritesService.getFavorites();
    expect(result[0].idMeal).toBe("456");
  });
});
