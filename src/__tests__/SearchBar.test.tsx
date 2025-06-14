import SearchBar from "@/components/SearchBar";
import { useIsMobile } from "@/hooks/useIsMobile";
import {
  fetchRecipeByIngredient,
  fetchRecipeByName,
} from "@/store/recipeSlice";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fireEvent, render, screen } from "@testing-library/react";

// Mocks
jest.mock("@/hooks/useIsMobile", () => ({
  useIsMobile: jest.fn(),
}));

jest.mock("@/store/store", () => ({
  useAppDispatch: jest.fn(),
  useAppSelector: jest.fn(),
}));

jest.mock("@/store/recipeSlice", () => ({
  fetchRecipeByName: jest.fn(),
  fetchRecipeByIngredient: jest.fn(),
  setSearchedIngredient: jest.fn(),
  setSearchedQuery: jest.fn(),
}));

describe("SearchBar", () => {
  const dispatchMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppDispatch as jest.Mock).mockReturnValue(dispatchMock);
    (useAppSelector as jest.Mock).mockReturnValue(false);
    (useIsMobile as jest.Mock).mockReturnValue(false);
  });

  test("renders search input and buttons", () => {
    render(<SearchBar />);
    expect(
      screen.getByPlaceholderText(/search for recipes by name/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  test("dispatches fetchRecipeByName on search submit", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/search for recipes by name/i);
    const button = screen.getByRole("button", { name: /search/i });

    fireEvent.change(input, { target: { value: "pizza" } });
    fireEvent.click(button);

    expect(dispatchMock).toHaveBeenCalledWith(
      fetchRecipeByName({ query: "pizza" })
    );
  });

  test("dispatches fetchRecipeByIngredient when clicking ingredient button", () => {
    render(<SearchBar />);
    const chickenBtn = screen.getByRole("button", { name: /chicken/i });

    fireEvent.click(chickenBtn);

    expect(dispatchMock).toHaveBeenCalledWith(
      fetchRecipeByIngredient({ ingredient: "Chicken" })
    );
  });

  test("resets search input and dispatches empty search", () => {
    render(<SearchBar />);
    const input = screen.getByPlaceholderText(/search for recipes by name/i);
    const resetBtn = screen.getByRole("button", { name: "reset-button" });

    fireEvent.change(input, { target: { value: "test" } });
    fireEvent.click(resetBtn);

    expect(input).toHaveValue("");
    expect(dispatchMock).toHaveBeenCalledWith(fetchRecipeByName({ query: "" }));
  });
});
