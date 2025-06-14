export interface Recipe {
  idMeal: string;
  strMeal: string;
  strDrinkAlternate?: string;
  strCategory: string;
  strArea: string;
  strInstructions?: string;
  strMealThumb: string;
  strYoutube?: string;
  strSource?: string | undefined | null;
  [key: string]: string | undefined | null;
}

export interface RecipeSearchResponse {
  meals: Recipe[] | null;
}

export interface FavoriteRecipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  dateAdded: string;
}

export interface SearchFilters {
  category: string;
  area: string;
}
