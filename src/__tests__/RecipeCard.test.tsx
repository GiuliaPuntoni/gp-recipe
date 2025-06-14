import RecipeCard from "@/components/Recipe/RecipeCard";
import { Recipe } from "@/types/recipe";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock `useFavorites` hook
const mockIsFavorite = jest.fn();
const mockAdd = jest.fn();
const mockRemove = jest.fn();

jest.mock("@/hooks/useFavorites", () => ({
  useFavorites: () => ({
    isFavorite: mockIsFavorite,
    addToFavorites: mockAdd,
    removeFromFavorites: mockRemove,
  }),
}));

// Mock store
jest.mock("@/store/store", () => ({
  useAppDispatch: () => jest.fn(),
}));

const mockRecipe: Recipe = {
  idMeal: "123",
  strMeal: "Test Recipe",
  strMealThumb: "https://via.placeholder.com/150",
  strInstructions: "Step 1: do something...",
  strCategory: "Main",
  strArea: "Italian",
};

describe("RecipeCard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("adds to favorites when not already a favorite", () => {
    mockIsFavorite.mockReturnValue(false);

    render(<RecipeCard recipe={mockRecipe} />);

    const button = screen.getByRole("button", { name: "favorite-button" });
    fireEvent.click(button);

    expect(mockAdd).toHaveBeenCalledWith(mockRecipe);
    expect(mockRemove).not.toHaveBeenCalled();
  });

  test("removes from favorites when already a favorite", () => {
    mockIsFavorite.mockReturnValue(true);

    render(<RecipeCard recipe={mockRecipe} />);

    const button = screen.getByRole("button", { name: "favorite-button" });
    fireEvent.click(button);

    expect(mockRemove).toHaveBeenCalledWith("123");
    expect(mockAdd).not.toHaveBeenCalled();
  });
});
